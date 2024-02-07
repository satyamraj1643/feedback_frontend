import React from 'react';

const Card = ({ feedback }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-6 min-w-0 max-w-md">
      <p><strong>Feedback:</strong> {feedback.content}</p>
      <p><strong>Feedback ID:</strong> {feedback.feedbackId}</p>
      <p><strong>Type:</strong> {feedback.feedbackType}</p>
      <p> By - {feedback.firstName} {feedback.lastName} </p>
      <p><strong>Created At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default Card;
