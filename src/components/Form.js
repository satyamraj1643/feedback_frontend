import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const Form = () => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const navigate = useNavigate();

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/formsubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          textContent: feedback,
          contentType: category,
          userId: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
  
      const data = await response.json();

      const feedbackId = data.feedbackId
      const fn = data.firstName
      const ln = data.lastName

      navigate('/submission', {state:{feedbackId}})

      // console.log(feedbackId,fn,ln);
      // console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen" style={{ background: 'linear-gradient(90deg, #186F65, #B5CB99 25%, #FCE09B 50%, #B2533E)' }}>
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <textarea
          className="w-full h-40 px-4 py-2 mb-4 rounded-lg resize-none bg-gray-200 focus:bg-white focus:outline-none"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Category:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Complaint"
                checked={category === 'Complaint'}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">Complaint</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Suggestion"
                checked={category === 'Suggestion'}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">Suggestion</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Inquiry"
                checked={category === 'Inquiry'}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">Inquiry</span>
            </label>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;