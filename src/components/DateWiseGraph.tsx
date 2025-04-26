
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FeedbackData } from './FeedbackForm';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO, subDays, compareAsc } from 'date-fns';

interface DateWiseGraphProps {
  feedbacks: FeedbackData[];
}

const DateWiseGraph: React.FC<DateWiseGraphProps> = ({ feedbacks }) => {
  // Process feedback data for the graph
  const feedbacksByDate = feedbacks.reduce((acc, feedback) => {
    const date = format(parseISO(feedback.timestamp), 'yyyy-MM-dd');
    
    if (!acc[date]) {
      acc[date] = {
        total: 0,
        ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
    
    acc[date].total += 1;
    acc[date].ratings[feedback.rating] += 1;
    
    return acc;
  }, {} as Record<string, { total: number, ratings: Record<number, number> }>);

  // Fill in missing dates with zeros (for the last 14 days)
  const today = new Date();
  const graphData = Array.from({ length: 14 }, (_, i) => {
    const date = format(subDays(today, 13 - i), 'yyyy-MM-dd');
    return {
      date,
      total: feedbacksByDate[date]?.total || 0,
      rating5: feedbacksByDate[date]?.ratings[5] || 0,
      rating4: feedbacksByDate[date]?.ratings[4] || 0,
      rating3: feedbacksByDate[date]?.ratings[3] || 0,
      rating2: feedbacksByDate[date]?.ratings[2] || 0,
      rating1: feedbacksByDate[date]?.ratings[1] || 0,
    };
  });

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium text-gray-500 mb-4 text-center">Feedback Over Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(parseISO(date), 'MMM d')}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip
                labelFormatter={(date) => format(parseISO(date as string), 'MMMM d, yyyy')}
                formatter={(value: number, name: string) => {
                  const labels = {
                    total: 'Total',
                    rating5: '5 Stars',
                    rating4: '4 Stars',
                    rating3: '3 Stars',
                    rating2: '2 Stars',
                    rating1: '1 Star',
                  };
                  return [`${value} feedback(s)`, labels[name as keyof typeof labels]];
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6' }}
              />
              <Line type="monotone" dataKey="rating5" name="5 Stars" stroke="#7C3AED" dot={false} />
              <Line type="monotone" dataKey="rating4" name="4 Stars" stroke="#9F7AEA" dot={false} />
              <Line type="monotone" dataKey="rating3" name="3 Stars" stroke="#C4B5FD" dot={false} />
              <Line type="monotone" dataKey="rating2" name="2 Stars" stroke="#DDD6FE" dot={false} />
              <Line type="monotone" dataKey="rating1" name="1 Star" stroke="#EDE9FE" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateWiseGraph;
