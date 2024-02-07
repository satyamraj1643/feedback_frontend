import React, { useState, useEffect } from 'react';
import Card from '../assets/Card';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const FeedbackList = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API using the userId dynamically
        const response = await fetch(`https://feedbackapi-dya7.onrender.com/getsubmission?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFeedbacks(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      }
    };

    fetchData();
  }, [userId]); // Include userId in the dependency array to re-fetch data when userId changes

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5 justify-center ">
      <h1 className="text-3xl font-semibold mb-6 text-white">Your Feedbacks</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback, index) => (
          <Card
            key={index} // Use a unique key for each card
            feedback={feedback} // Pass the feedback object as prop
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
