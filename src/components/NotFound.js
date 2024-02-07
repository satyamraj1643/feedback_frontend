import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const NotFoundPage = () => {

    const authCtx = useContext(AuthContext);

    const isAdmin = authCtx.role === 'admin'
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The page you're looking for does not exist.</p>
    {!isAdmin && <Link to='/' className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Go Home
    </Link>}
       {isAdmin &&  <Link to='/allfeedbacks' className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go Home
        </Link>}
      </div>
    </div>
  );
};

export default NotFoundPage;
