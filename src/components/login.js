import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [adminId, setAdminId] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
    setServerError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
    setServerError('');
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAdminIdChange = (event) => {
    setAdminId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required.');
      return;
    }

    try {
      const response = await fetch("https://feedbackapi-dya7.onrender.com/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          role,
          adminId // Include adminId in the request body
        })
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const id = data.id;
        const role = data.role;
        const hadminId = data.hashedAdminId;
        authCtx.login(token, id, role, hadminId);
        if(role == 'user'){
          navigate('/form');
        } else{
          navigate(`/allfeedbacks`);
        }
      } else {
        if (data.error === 'MISMATCH_ADMINID') {
          setServerError('Incorrect associated admin id is entered');
        } else if (data.error === 'NOT_FOUND') {
          setServerError('User not found in our database.');
        } else if (data.error === 'INVALID') {
          setServerError('Invalid credentials');
        } else {
          setServerError('Login failed: ' + data.error);
        }
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      setServerError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="h-auto md:h-screen py-32 bg-gradient-to-br from-blue-500 to-purple-600" >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('back.png')" }}>
            <h1 className="text-[#A2C579] text-center text-7xl mb-10" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>All ready onboard!</h1>
            <div className="text-[#F9B572] flex text-6xl text text-center" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>Cool!</div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <h2 className="text-4xl mb-4 text-center text-[#B2533E]">Enter your email and password.</h2>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <p className="text-sm m-1 text-[#B2533E]">Email:</p>
                <input type="text" value={email} onChange={handleEmailChange} placeholder="johndoe@example.com" className="border border-[#186F65] py-1 px-2 w-full rounded-lg" />
                <div className="text-sm text-[#D21312]">
                  <p>{emailError}</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm m-1 text-[#B2533E]">Password:</p>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" className="border border-[#186F65] py-1 px-2 w-full rounded-lg" />
                <div className="text-sm text-[#D21312]">
                  <p>{passwordError}</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm m-1 text-[#B2533E]">Role:</p>
                <select value={role} onChange={handleRoleChange} className="border border-[#186F65] py-1 px-2 w-full rounded-lg">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {role === 'admin' && ( // Render adminId input only if role is 'admin'
                <div className="mt-5">
                  <p className="text-sm m-1 text-[#B2533E]">Admin ID:</p>
                  <input type="text" value={adminId} onChange={handleAdminIdChange} placeholder="Admin ID" className="border border-[#186F65] py-1 px-2 w-full rounded-lg" />
                </div>
              )}
              <div className="text-sm m-1 text-center text-[#D21312]">
                <p>{serverError}</p>
              </div>
              <div className="mt-5">
                <button type="submit" className="w-full bg-[#186F65] hover:bg-[#B2533E] py-3 text-center text-white rounded-xl">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
