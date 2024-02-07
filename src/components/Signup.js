import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const authCtx = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [role, setRole] = useState("user");
  const [adminId, setAdminId] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
    setSubmissionStatus("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMismatchError("");
    setSubmissionStatus("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMismatchError("");
    setSubmissionStatus("");
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setSubmissionStatus("");
  };

  const handleAdminIdChange = (event) => {
    setAdminId(event.target.value);
    setSubmissionStatus("");
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://feedbackapi-dya7.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fn: firstName,
          ln: lastName,
          email,
          password,
          role,
          adminId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionStatus("Account created successfully");
        const token = data.token;
        const id = data.id;
        const hadminId = data.hashedAdminId;
        authCtx.login(token, id, role, hadminId);
        if (role === "user") {
          navigate("/form");
        } else {
          navigate(`/allfeedbacks/${id}/${hadminId}`);
        }
      } else if (data.error === "user_exists") {
        setSubmissionStatus(
          "A user with this email already exists. Please use another email."
        );
      } else if (data.error === "MISMATCH_ADMINID") {
        setSubmissionStatus("Invalid Admin Id");
      }
      else if(data.error === 'ALREADY'){
        setSubmissionStatus("Email already present in our database.")
      }
    } catch (error) {
      setSubmissionStatus(
        "An error occurred while creating the account. Please try again later."
      );
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="h-auto md:h-screen py-20"
      style={{
        background:
          "linear-gradient(90deg, #186F65, #B5CB99 25%, #FCE09B 50%, #B2533E)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('back.png')" }}
          >
            <h2
              className="text-[#A2C579] text-6xl mb-10"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Welcome.
            </h2>
            <div
              className="text-[#F9B572] flex text-5xl text text-center"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              <p>
                A place to give <u>feedbacks,</u> <span> </span> for things to
                be better.
              </p>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 py-16 px-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <h2 className="text-4xl mb-4 text-[#186F65]">
              Send you valuable opinion.
            </h2>

            <p className="mb-4 text-xl text-[#ED7D31]">
              Create your account. It's free and only takes a minute.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  name="firstName"
                  className="border border-[#186F65] py-1 px-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={handleLastNameChange}
                  name="lastName"
                  className="border border-[#186F65] py-1 px-2 rounded-lg"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  id="user_email"
                  name="email"
                  className="border border-[#186F65] py-1 px-2 w-full rounded-lg"
                />
                <div id="cond_email" className="text-sm mt-1 text-[#D21312]">
                  <p>{emailError}</p>
                </div>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  id="init_p"
                  name="paswd"
                  className="border border-[#186F65] py-1 px-2 w-full rounded-lg"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  id="final_p"
                  name="cnfpaswd"
                  className="border border-[#186F65] py-1 px-2 w-full rounded-lg"
                />
                <div className="text-sm mt-1 text-[#D21312]">
                  <p id="mismatch">{passwordMismatchError}</p>
                </div>
              </div>
              <div className="mt-5">
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="border border-[#186F65] p-3 rounded-lg"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {role === "admin" && (
                  <input
                    type="password"
                    placeholder="Enter your admin ID"
                    value={adminId}
                    onChange={handleAdminIdChange}
                    id="admin_id"
                    name="adminId"
                    className="border border-[#186F65] py-1 px-2 w-100 m-1 rounded-lg"
                  />
                )}
              </div>

              <div className="m-2 text-center text-l p-1 text-[#D21312]">
                {submissionStatus && (
                  <p className="messageDiv">{submissionStatus}</p>
                )}
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-[#B2533E] hover:bg-[#186F65] py-3 text-center text-white rounded-xl"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
