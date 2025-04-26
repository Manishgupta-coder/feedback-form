
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { FeedbackData } from './FeedbackForm';

interface FeedbackItemProps {
  feedback: FeedbackData;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  // Format timestamp to a more readable format
  const formattedDate = new Date(feedback.timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow duration-300 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{feedback.name}</h3>
            <p className="text-sm text-gray-500">{feedback.email}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={16}
                fill={index < feedback.rating ? "#FFD700" : "none"}
                stroke={index < feedback.rating ? "#FFD700" : "#d1d5db"}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-gray-700 whitespace-pre-wrap">{feedback.feedbackText}</p>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-gray-400">
        Submitted on {formattedDate}
      </CardFooter>
    </Card>
  );
};

export default FeedbackItem;
