import React from "react";
import logo from "../../logo.svg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoading());
      const response = await axios.post("https://buildforyou.site/api/admin/admin-login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home");
        localStorage.setItem("admin_Secret", response.data.admin_Secret);
        navigate("/adminHome");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    
    <div class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
    <h2 className="text-center text-2xl font-semibold mb-3">Admin Login</h2>
  
    <div class="flex flex-col items-center justify-center">
    <img src={logo} style={{ maxWidth: '6%', height: 'auto' }} alt="logo" />
  
      <div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
      <div class="h-full bg-gradient-to-tl from-green-400 to-yellow-200 w-full py-16 px-4">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="exampleInputEmail1" className="block text-red-600">
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
            <label htmlFor="exampleInputPassword1" className="block text-red-600">
              Password
            </label>
            <input
              type="password"
              placeholder="*********"
              className="w-full border rounded-md py-2 px-3 focus:ring focus:border-blue-500"
              id="exampleInputPassword1"
              name="password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Login
          </button>
        </form>
        </div>
      </div>
    </div>
  </div>
  

   
  );
}

export default AdminLogin;
