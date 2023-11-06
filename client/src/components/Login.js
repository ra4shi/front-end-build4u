import React from "react";

import logo from "../logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    try {
      dispatch(showLoading())
      e.preventDefault();
      const response = await axios.post("https://buildforyou.site/api/user/login", {
        email: e.target.email.value,
        password: e.target.password.value
      })
      dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        toast("Redirected to homes")
        localStorage.setItem("token", response.data.token)
        navigate('/homePage')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="h-full bg-gradient-to-tl from-yellow-400 to-indigo-900 w-full py-16 px-4">
  <h2 className="text-center text-2xl font-semibold mb-3">Login Form</h2>

  <div className="flex flex-col items-center justify-center">
  <img src={logo} style={{ maxWidth: '6%', height: 'auto' }} alt="logo" />

    <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="exampleInputEmail1" className="block text-white">
            Email address
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full border rounded-md py-2 px-3 focus:ring focus:border-blue-500"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="exampleInputPassword1" className="block text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="*******"
            className="w-full border rounded-md py-2 px-3 focus:ring focus:border-blue-500"
            id="exampleInputPassword1"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>

        <Link to='/forgotPassword' className='block text-center text-black mt-2'>Forgot password</Link>
        <Link to='/register' className='block text-center text-black mt-2'>Go to Registration</Link>
      </form>
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;
