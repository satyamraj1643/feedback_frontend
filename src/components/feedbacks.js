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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {feedbacks.map(feedback => (
        <Card key={feedback._id} feedback={feedback} /> // Render Card component for each feedback item
      ))}
    </div>
  );
}

export default AdminFeedbacks;
