import React from "react";
import Form from "./components/Form";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useContext } from 'react';
import AuthContext from './context/auth-context';
import FeedbackList from "./components/FeedbackList";
import Submission from "./components/Submission";
import AdminFeedbacks from "./components/feedbacks";
import NotFoundPage from "./components/NotFound";

const App = () => {
   const authCtx = useContext(AuthContext);
   const id = authCtx.userId;
   const hashedAdminId = authCtx.adminId;
   const role = authCtx.role;
   const isAdmin = role === 'admin';
   const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
       <Home/>
      <Routes>
        {/* Public Routes */}
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage/>} />
          </>
        )}

        {/* Private Routes */}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Form />} />
            <Route path="/form" element={<Form />} />
            <Route path={`/feedbacks/${id}`} element={<FeedbackList />} />
            <Route path="/submission" element={<Submission />} />
            
          </>
        )}

        {/* Admin Routes */}
        {isAdmin && isLoggedIn && (
          <>
            <Route path={`/allfeedbacks`} element={<AdminFeedbacks />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App;
