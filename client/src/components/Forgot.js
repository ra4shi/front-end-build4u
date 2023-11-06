import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import logo from "../logo.svg";
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://buildforyou.site/api/user/forgotPassword', { email: email });

      if (response.data.success) {
        toast.success(response.data.message);
        setOtpSent(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://buildforyou.site/api/user/resetPassword', {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="bg-white p-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-4" />
          <span className="text-black text-lg font-semibold">Build4You</span>
        </div>
        <div className="md:flex md:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="absolute inset-y-0 right-0 px-3 flex items-center bg-blue-300 text-white rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 13.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M7 14a7 7 0 110-14 7 7 0 010 14zm0-1a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ul className="flex space-x-4 mt-4 md:mt-0">
                        <li>
                            <Link to={"/"}>
                            <p className="text-black hover:text-blue-300">
                                Home
                            </p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/companies"}>
                            <p className="text-black hover:text-blue-300">
                                Company
                            </p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/services"}>
                            <a className="text-black hover:text-blue-300">
                                Services
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/projects"}>
                            <a className="text-black hover:text-blue-300">
                                Projects
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/appointments"}>
                            <a className="text-black hover:text-blue-300">
                                Appointment
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user-profile"}>
                            <a className="text-black hover:text-blue-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8a5 5 0 00-10 0v4a5 5 0 0010 0V8z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 22h2a2 2 0 002-2v-1a7 7 0 00-7-7H9a7 7 0 00-7 7v1a2 2 0 002 2h2"
                                    />
                                </svg>
                            </a>
                            </Link>
                        </li>
                    </ul>
        </div>
      </nav>


      <div className="min-h-screen flex items-center justify-center">
  {!otpSent ? (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleForgotPassword}>
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send OTP
      </button>
    </form>
  ) : (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleResetPassword}>
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <div className="mb-4">
        <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">Enter new password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Reset Password
      </button>
    </form>
  )}
</div>

    </div>
  );
}

export default ForgotPassword;
