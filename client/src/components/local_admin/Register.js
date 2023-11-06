import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import logo from '../../logo.svg';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleRegister = async (e) => {
    try {
      dispatch(showLoading());
      e.preventDefault();

         // Validation checks
         if (name.trim() === '') {
          toast.error('Please enter your name.');
          return;
        }
  
        if (username.trim() === '') {
          toast.error('Please enter a username.');
          return;
        }
  
        if (email.trim() === ''||  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast.error('Please enter a valid email address.');
          return;
        }
  
        if (password.trim() === '') {
          toast.error('Please enter a password.');
          return;
        }
  
        if (mobile.trim() === '' || mobile.length !== 10) {
          toast.error('Please enter a valid 10-digit mobile number.');
          return;
        }

      const response = await axios.post('https://buildforyou.site/api/localadmin/register', {
        name: name,
        username: username,
        email: email,
        password: password,
        mobile: mobile,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        setOtpSent(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrongs');
      console.log(error);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await axios.post('https://buildforyou.site/api/localadmin/otpVerification', {
        email: email,
        otp: otp,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/localadmin/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const handleResendOtp = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post('https://buildforyou.site/api/localadmin/resend-otp', {
        email: email,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
     
      toast.error('Something went wrong');
      console.log(error);
    }
  };


  return (
     
    <div class="h-full bg-gradient-to-tl from-green-400 to-red-900 w-full py-16 px-4">
  <h2 className="text-center text-2xl font-semibold mb-3">Register Form</h2>

  <div class="flex flex-col items-center justify-center">
  <img src={logo} style={{ maxWidth: '6%', height: 'auto' }} alt="logo" />

    <div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
      {!otpSent ? (
        <form onSubmit={handleRegister}>
          <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to your account</p>
          <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Don't have an account? <a href="/localadmin/login" class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"> Sign in here</a></p>

          <div class="w-full flex items-center justify-between py-5">
            <hr class="w-full bg-gray-400" />
            <p class="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
            <hr class="w-full bg-gray-400" />
          </div>

          <div>
            <label id="name" class="text-sm font-medium leading-none text-gray-800">
              Name
            </label>
            <input
              id="name"
              placeholder='Name'
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                
              }}
              required class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            
          </div>

          <div>
            <label id="name" class="text-sm font-medium leading-none text-gray-800">
              User Name
            </label>
            <input
              id="username"
              placeholder='cannot change after register'
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                
              }}
              required class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            
          </div>

          <div>
            <label id="name" class="text-sm font-medium leading-none text-gray-800">
              Email address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                
              }}
              required class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
          
          </div>
          <div>
            <label id="name" class="text-sm font-medium leading-none text-gray-800">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                
              }}
              required class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            /> 
        
          </div>

          <div>
            <label id="name" class="text-sm font-medium leading-none text-gray-800">
              Mobile
            </label>
            <input
              type="number"
              placeholder="Mobile"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                
              }}
              required class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
           
          </div>

          <div class="mt-8">
            <button type="submit" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Create my account</button>
          </div>
        </form>
      ) : (
        <div class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
          <form className="space-y-4" onSubmit={handleOtpVerification}>
            <div>
              <label htmlFor="otp" className="block text-gray-600">
                Enter OTP
              </label>
              <input
                type="number"
                placeholder="Enter OTP"
                className="w-full border rounded-md py-2 px-3 focus:ring focus:border-blue-500"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                   
                }}
                required
              />
             
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Verify OTP
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Resend OTP
            </button>
          </form>
        </div>
      )}
    </div>
  </div>
</div>

   
  );
}

export default Register;
