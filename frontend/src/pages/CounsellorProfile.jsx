import React from 'react';
import { useParams } from 'react-router-dom';

const CounsellorProfile = () => {
  const { counsellorId } = useParams();

  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Counsellor Profile</h1>
      <p>Counsellor ID: {counsellorId}</p>
      {/* Fetch and display counsellor details */}
    </div>
  );
};

export default CounsellorProfile;
