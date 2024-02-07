import React from "react";
import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useContext } from 'react';
import AuthContext from './context/auth-context';
import FeedbackList from "./components/FeedbackList";
import Submission from "./components/Submission";
import AdminFeedbacks from "./components/feedbacks";

const App = () => {
   const authCtx = useContext(AuthContext);
   const id = authCtx.userId;
   const hashedAdminId = authCtx.adminId;
   const role = authCtx.role;
   const isAdmin = role === 'admin';

   //console.log(role);

  return (
    <>
       <Home/>
      <Routes>

        
        {isAdmin && authCtx.isLoggedIn && (
          <>
          
          <Route path='/' element={<AdminFeedbacks />} />

          <Route path={`/allfeedbacks/${id}/${hashedAdminId}`} element={<AdminFeedbacks />} />
          </>
        )}

        
        {!isAdmin && (
          <>
            {authCtx.isLoggedIn && <Route path="/" element={<Form/>}/>}
            {!authCtx.isLoggedIn && <Route path="/" element={<Login/>}/>}
            {!authCtx.isLoggedIn && <Route path='/login' element={<Login/>}/>}
            {authCtx.isLoggedIn && <Route path='/login' element={<Form/>}/>}
            {authCtx.isLoggedIn && <Route path='/signup' element={<Form/>}/>}
            {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup/>}/>}
            { authCtx.isLoggedIn && <Route path='/form' element={<Form/>}/>}
            {!authCtx.isLoggedIn && <Route path='/form' element={<Login/>}/>}
            { authCtx.isLoggedIn && id && <Route path={`/feedbacks/${id}`} element={<FeedbackList/>}/>}
            {!authCtx.isLoggedIn && <Route path={`/feedbacks/${id}`} element={<Login/>}/>}
            {authCtx.isLoggedIn && <Route path={'/submission'} element={<Submission/>}/>}
          </>
        )}

      </Routes>
    </>
  )
}

export default App;
