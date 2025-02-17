import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Please provide an event name'],
      trim: true,
      index: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a place'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    poc: {
      type: Schema.Types.ObjectId,
      ref: 'Poc',
      required: [true, 'Please select a Point of Contact (POC)'],
    },
    activityPoints: {
      type: Number,
      required: [true, 'Please provide activity points'],
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', EventSchema);