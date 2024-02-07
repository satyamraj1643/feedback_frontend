import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import Card from "../assets/Card"; // Import the Card component

const AdminFeedbacks = () => {
  const authCtx = useContext(AuthContext);
  const hashedAdminId = authCtx.adminId;
  const userId = authCtx.userId;

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://feedbackapi-dya7.onrender.com/allfeedbacks?hashedAdminId=${hashedAdminId}&userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data.data); // Set feedbacks state with the fetched data
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [hashedAdminId, userId]); // Include hashedAdminId and userId in the dependency array to re-fetch data when they change

  return (
    <div className="min-h-screen p-5 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-6 text-white">All Feedbacks</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map(feedback => (
          <Card key={feedback._id} feedback={feedback} /> // Render Card component for each feedback item
        ))}
      </div>
    </div>
  );
}

export default AdminFeedbacks;
