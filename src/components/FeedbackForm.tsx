
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit?: (feedback: FeedbackData) => void;
}

export interface FeedbackData {
  name: string;
  email: string;
  rating: number;
  feedbackText: string;
  timestamp: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !feedbackText || rating === 0) {
      toast({
        variant: "destructive",
        title: "Please fill out all fields",
        description: "All fields are required, including a rating."
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return;
    }

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      name,
      email,
      rating,
      feedbackText,
      timestamp: new Date().toISOString()
    };

    try {
      // In a real implementation, this would call an API
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock API call success
      if (onSubmit) {
        onSubmit(feedbackData);
      }

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });

      // Reset form
      setName('');
      setEmail('');
      setRating(0);
      setFeedbackText('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was a problem submitting your feedback. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-feedback-blue to-feedback-teal text-white rounded-t-lg">
        <CardTitle className="text-2xl">Share Your Feedback</CardTitle>
        <CardDescription className="text-white/80">
          We value your input to help us improve.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border-gray-200 focus:border-feedback-blue focus:ring-feedback-blue"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="border-gray-200 focus:border-feedback-blue focus:ring-feedback-blue"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    fill={(hoverRating || rating) >= star ? "#FFD700" : "none"}
                    stroke={(hoverRating || rating) >= star ? "#FFD700" : "currentColor"}
                    size={24}
                    className="cursor-pointer transition-transform hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea 
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share your thoughts with us..."
              rows={5}
              className="border-gray-200 focus:border-feedback-blue focus:ring-feedback-blue resize-none"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t border-gray-100 pt-4 pb-6 px-6">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-feedback-blue to-feedback-teal hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
