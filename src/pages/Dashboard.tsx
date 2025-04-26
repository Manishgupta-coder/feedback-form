import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import FeedbackList from '@/components/FeedbackList';
import FeedbackFilters from '@/components/FeedbackFilters';
import FeedbackStats from '@/components/FeedbackStats';
import { FeedbackData } from '@/components/FeedbackForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<FeedbackData[]>([]);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll get data from localStorage
    const loadFeedbacks = async () => {
      setIsLoading(true);
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const storedFeedbacks = localStorage.getItem('feedbacks');
        if (storedFeedbacks) {
          setFeedbacks(JSON.parse(storedFeedbacks));
        } else {
          // Set some sample data if none exists
          const sampleFeedbacks: FeedbackData[] = [
            {
              name: "John Doe",
              email: "john@example.com",
              rating: 5,
              feedbackText: "Great experience using this service. The interface is intuitive and easy to navigate.",
              timestamp: "2023-04-25T10:30:00Z"
            },
            {
              name: "Jane Smith",
              email: "jane@example.com",
              rating: 4,
              feedbackText: "Overall good, but there are some features I'd like to see improved. The response time could be better.",
              timestamp: "2023-04-24T15:45:00Z"
            },
            {
              name: "Alex Johnson",
              email: "alex@example.com",
              rating: 3,
              feedbackText: "Average service. Nothing special but gets the job done.",
              timestamp: "2023-04-23T08:20:00Z"
            },
            {
              name: "Sarah Williams",
              email: "sarah@example.com",
              rating: 5,
              feedbackText: "Excellent customer support! They helped me resolve my issues promptly.",
              timestamp: "2023-04-22T14:15:00Z"
            }
          ];
          setFeedbacks(sampleFeedbacks);
          localStorage.setItem('feedbacks', JSON.stringify(sampleFeedbacks));
        }
      } catch (error) {
        console.error("Error loading feedback data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeedbacks();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let results = [...feedbacks];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(feedback => 
        feedback.name.toLowerCase().includes(searchLower) ||
        feedback.email.toLowerCase().includes(searchLower) ||
        feedback.feedbackText.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply date filter
    if (dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      
      results = results.filter(feedback => {
        const feedbackDate = new Date(feedback.timestamp);
        if (dateRange === 'today') {
          return feedbackDate >= today;
        } else if (dateRange === 'week') {
          return feedbackDate >= weekAgo;
        } else if (dateRange === 'month') {
          return feedbackDate >= monthAgo;
        }
        return true;
      });
    }
    
    // Apply rating filter
    if (ratingFilter !== 'all') {
      const ratingNumber = parseInt(ratingFilter);
      results = results.filter(feedback => feedback.rating === ratingNumber);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortBy === 'rating-high') {
        return b.rating - a.rating;
      } else if (sortBy === 'rating-low') {
        return a.rating - b.rating;
      }
      return 0;
    });
    
    setFilteredFeedbacks(results);
  }, [feedbacks, search, dateRange, ratingFilter, sortBy]);

  return (
    <PageLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-feedback-blue to-feedback-teal bg-clip-text text-transparent">
            Feedback Dashboard
          </h1>
          <p className="text-gray-600">
            View, filter, and analyze all collected feedback.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-feedback-blue"></div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="stats" className="mb-6">
              <TabsList>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="pt-4">
                <FeedbackStats feedbacks={feedbacks} />
              </TabsContent>
              <TabsContent value="grid" className="pt-4">
                <FeedbackFilters
                  search={search}
                  setSearch={setSearch}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  ratingFilter={ratingFilter}
                  setRatingFilter={setRatingFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
                
                <FeedbackList feedbacks={filteredFeedbacks} />
                
                {filteredFeedbacks.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-lg text-gray-500">No matching feedback found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
