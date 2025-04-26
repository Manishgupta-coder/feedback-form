
import React from 'react';
import FeedbackItem from './FeedbackItem';
import { FeedbackData } from './FeedbackForm';

interface FeedbackListProps {
  feedbacks: FeedbackData[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  if (feedbacks.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No feedback found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {feedbacks.map((feedback, index) => (
        <FeedbackItem key={index} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackList;
