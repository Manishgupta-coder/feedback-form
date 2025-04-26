
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FeedbackData } from './FeedbackForm';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface RatingPieChartProps {
  feedbacks: FeedbackData[];
}

const RatingPieChart: React.FC<RatingPieChartProps> = ({ feedbacks }) => {
  // Count ratings
  const ratingCounts = {
    5: feedbacks.filter(f => f.rating === 5).length,
    4: feedbacks.filter(f => f.rating === 4).length,
    3: feedbacks.filter(f => f.rating === 3).length,
    2: feedbacks.filter(f => f.rating === 2).length,
    1: feedbacks.filter(f => f.rating === 1).length,
  };

  // Convert to format needed for pie chart
  const pieData = [
    { name: '5 Stars', value: ratingCounts[5], color: '#8B5CF6' },
    { name: '4 Stars', value: ratingCounts[4], color: '#A78BFA' },
    { name: '3 Stars', value: ratingCounts[3], color: '#C4B5FD' },
    { name: '2 Stars', value: ratingCounts[2], color: '#DDD6FE' },
    { name: '1 Star', value: ratingCounts[1], color: '#EDE9FE' },
  ].filter(item => item.value > 0); // Only show ratings that have values

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium text-gray-500 mb-4 text-center">Rating Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} feedback(s)`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingPieChart;
