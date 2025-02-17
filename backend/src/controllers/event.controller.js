import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Event } from '../models/event.model.js';
import { User } from '../models/user.model.js';

/* Add the event details to the Event database
It takes in the eventname, description, date, location and adds it to the database 
It also checks if the same event ( with eventname and date being same ) and then throws error if its alreay present */
const addEvent = AsyncHandler(async (req, res) => {
  const { eventName, description, location, date, activityPoints, poc } = req.body;

  if (
    [eventName, description, location, date, poc].some(
      (field) => field?.trim() === ''
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const existedEvent = await Event.findOne({
    $and: [{ eventName }, { date }],
  });

  if (existedEvent) {
    throw new ApiError(409, 'Event already exists');
  }

  //add the new event to the database
  const event = await Event.create({
    eventName,
    description,
    location,
    date,
    lead: req.user._id,
    poc,
    activityPoints,
  });

  if (!event) {
    throw new ApiError(500, 'Event could not be created');
  }

  const createdEvent = await Event.findById(event._id);

  res
    .status(200)
    .json(new ApiResponse(200, createdEvent, 'Event created successfully'));
});

//It updates the event details by taking the id from the parameter and changes the required field
const updateEvent = AsyncHandler(async (req, res) => {
  const { eventName, description, location, date, poc } = req.body;

  if (!eventName && !description && !location && !date && !poc) {
    throw new ApiError(400, 'Atleast one field is required to update');
  }

  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  event.eventName = eventName || event.eventName;
  event.description = description || event.description;
  event.location = location || event.location;
  event.date = date || event.date;
  event.poc = poc || event.poc;

  await event.save();

  res
    .status(200)
    .json(new ApiResponse(200, event, 'Event updated successfully'));
});

//delete the event
const deleteEvent = AsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  await Event.findByIdAndDelete(event);

  res
    .status(200)
    .json(new ApiResponse(200, event, 'Event deleted successfully'));
});

const addEventUsers = AsyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { usn } = req.body;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  const user = await User.findOne({ usn });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (event.participants.includes(user._id)) {
    return res
      .status(400)
      .json(new ApiError(400, 'User already added to event'));
  }

  event.participants.push(user._id);

  await event.save();

  if (user.participated.includes(eventId)) {
    return res
      .status(400)
      .json(new ApiError(400, 'Event already added in the user list'));
  }

  user.participated.push(eventId);

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, event, 'User added to event successfully'));
});

const removeEventUser = AsyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { usn } = req.body;

  const event = await Event.findById(eventId);
  console.log(usn)

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  const user = await User.findOne({ usn });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!event.participants.includes(user._id)) {
    return res
      .status(400)
      .json(new ApiError(400, 'User is not a participant of the event'));
  }

  event.participants = event.participants.filter(
    (participant) => !participant.equals(user._id)
  );
  await event.save();

  if (!user.participated.includes(eventId)) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Event is not listed in the user's participation list"
        )
      );
  }

  user.participated = user.participated.filter(
    (participatedEvent) => !participatedEvent.equals(eventId)
  );
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, event, 'User removed from event successfully'));
});

//used to fetch the detail of the particular event.
const getEventDetails = AsyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  const volunteers = await Event.findOne(event)
    .populate({
      path: 'participants',
      select: 'usn email department role username',
    })
    .populate({
      path: 'lead',
      select: 'usn username email department',
    })
    .populate({
      path: 'poc',
      select: 'usn username email department',
    })
    .exec();

  if (!volunteers) {
    throw new ApiError(404, 'No volunteers found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, volunteers, 'Volunteers fetched successfully'));
});

// It returns all the documents in the collection
const getEvent = AsyncHandler(async (req, res) => {
  const events = await Event.find()
    .populate({
      path: 'poc',
      model: 'Poc',
      select: 'pocName pocNumber head',
      populate: {
        path: 'head',
        model: 'User',
        select: 'username'
      }
    });

  if (!events) {
    throw new ApiError(404, 'No events found');
  }

  console.log("Events with POC:", JSON.stringify(events, null, 2));

  res
    .status(200)
    .json(new ApiResponse(200, events, 'Events fetched successfully'));
});

const searchRecords = AsyncHandler(async (req, res) => {
  try {
    const { eventName, location, date, minPoints, maxPoints } = req.body;

    let conditions = [];

    if (eventName) {
      conditions.push({ eventName: { $regex: eventName, $options: 'i' } });
    }

    if (location) {
      conditions.push({ location: { $regex: location, $options: 'i' } });
    }

    if (date) {
      conditions.push({ date: new Date(date) });
    }

    let pointsCondition = {};
    if (minPoints) pointsCondition.$gte = Number(minPoints);
    if (maxPoints) pointsCondition.$lte = Number(maxPoints);
    if (Object.keys(pointsCondition).length > 0) {
      conditions.push({ activityPoints: pointsCondition });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};

    const results = await Event.find(query)
      .populate({
        path: 'poc',
        model: 'Poc',
        select: 'pocName pocNumber head',
        populate: {
          path: 'head',
          model: 'User',
          select: 'username'
        }
      });

    res
      .status(200)
      .json(new ApiResponse(200, results, 'Events fetched successfully'));
  } catch (error) {
    throw new ApiError(404, 'No events found');
  }
});

export {
  addEvent,
  updateEvent,
  deleteEvent,
  addEventUsers,
  getEventDetails,
  getEvent,
  removeEventUser,
  searchRecords,
};
