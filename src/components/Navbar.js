import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const id = authCtx.userId;
  const isAdmin = authCtx.role === "admin";
  const hashedAdminId = authCtx.adminId;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/form");
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/allfeedbacks" className="text-white text-lg font-bold">
          Feedback System
        </Link>
        <ul className="flex space-x-4 items-center">
          {isAdmin && (
            <li>
              <Link
                to={`/allfeedbacks/${id}/${hashedAdminId}`}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                See Feedbacks
              </Link>
            </li>
          )}
          {!isAdmin && (
            <li>
              <Link
                to="/form"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Add Feedback
              </Link>
            </li>
          )}
          {id && !isAdmin && (
            <li>
              <Link
                to={`/feedbacks/${id}`}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Feedback Status
              </Link>
            </li>
          )}
          {!authCtx.isLoggedIn && (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 transition duration-300 bg-transparent border border-white rounded-md py-1 px-3 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-300 transition duration-300 bg-transparent border border-white rounded-md py-1 px-3 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button
                onClick={logoutHandler}
                className="text-white hover:text-gray-300 transition duration-300 bg-transparent border border-white rounded-md py-1 px-3 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
