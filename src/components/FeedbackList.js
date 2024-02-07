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
        const response = await fetch(`http://localhost:5000/getsubmission?userId=${userId}`);
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Your feedbacks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
