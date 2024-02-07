import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const Submission = (props) => {
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;

  const location = useLocation();
  const feedbackId= location.state.feedbackId;

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <table className="table-auto border border-gray-200 shadow-lg rounded-lg mb-4">
        <tbody>
          <tr>
            <td className="px-4 py-2 text-xl text-center bg-white"> Your unique submission id is: {feedbackId}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        {
          id ? (
            <Link to={`/feedbacks/${id}`} className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none">Go Back</Link>
          ) : (
            <Link to="/form" className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none">Go Back</Link>
          )
        }
      </div>
    </div>
  );
};

export default Submission;
