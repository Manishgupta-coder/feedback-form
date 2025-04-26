
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import FeedbackForm, { FeedbackData } from '@/components/FeedbackForm';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const { toast } = useToast();

  const handleSubmit = (feedback: FeedbackData) => {
    // In a real app, this would be an API call
    setFeedbacks([...feedbacks, feedback]);
    
    // Save to local storage for demonstration purposes
    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    localStorage.setItem('feedbacks', JSON.stringify([...existingFeedbacks, feedback]));
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your input is valuable to us.",
    });
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-feedback-blue to-feedback-teal bg-clip-text text-transparent">
            We Value Your Feedback
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Your thoughts help us improve our service. Share your experience with us and help us make things better.
          </p>
        </div>
        
        <FeedbackForm onSubmit={handleSubmit} />
      </div>
    </PageLayout>
  );
};

export default Index;
