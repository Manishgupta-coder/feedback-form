
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FeedbackData } from './FeedbackForm';
import DateWiseGraph from './DateWiseGraph';
import RatingPieChart from './RatingPieChart';

interface StatsProps {
  feedbacks: FeedbackData[];
}

const FeedbackStats: React.FC<StatsProps> = ({ feedbacks }) => {
  // Calculate average rating
  const averageRating = feedbacks.length 
    ? feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length
    : 0;
  
  const roundedRating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place
  
  // Count ratings
  const ratingCounts = {
    5: feedbacks.filter(f => f.rating === 5).length,
    4: feedbacks.filter(f => f.rating === 4).length,
    3: feedbacks.filter(f => f.rating === 3).length,
    2: feedbacks.filter(f => f.rating === 2).length,
    1: feedbacks.filter(f => f.rating === 1).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-500">Total Feedback</h3>
              <p className="text-4xl font-bold text-feedback-blue">{feedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-500">Average Rating</h3>
              <p className="text-4xl font-bold text-feedback-teal">{roundedRating.toFixed(1)}/5</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-500 text-center mb-2">Rating Distribution</h3>
              
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingCounts[rating as keyof typeof ratingCounts];
                const percentage = feedbacks.length ? (count / feedbacks.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-feedback-blue to-feedback-teal h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RatingPieChart feedbacks={feedbacks} />
        <DateWiseGraph feedbacks={feedbacks} />
      </div>
    </div>
  );
};

export default FeedbackStats;
