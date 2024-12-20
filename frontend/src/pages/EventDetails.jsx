import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();

  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Event Details</h1>
      <p>Event ID: {eventId}</p>
      {/* Fetch and display event details */}
    </div>
  );
};

export default EventDetails;
