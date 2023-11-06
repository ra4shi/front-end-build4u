import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../logo.svg";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminUserEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ name: "", email: "" });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

  const [searchParams] = useSearchParams();

  const getData = async () => {
    const id = searchParams.get("id");
    try {
      dispatch(showLoading());
      const res = await axios.post("https://buildforyou.site/api/admin/get-user-data", { id },
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("admin_Secret"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      navigate("/admin");
      localStorage.removeItem("admin_Secret");
    }
  };

  const editUser = async (e) => {
    e.preventDefault();

    const id = searchParams.get("id");
    try {
      dispatch(showLoading());
      const response = await axios.post("https://buildforyou.site/api/admin/edit-user-info",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('admin_Secret')
          }
        }, {
        name: e.target.name.value ? e.target.name.value : data.name,
        email: e.target.email.value ? e.target.email.value : data.email,
        id: id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Profile Updated Successfully");
        navigate("/users-list");
      }
    } catch (error) {
      toast.error("Something Went Wrong " + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex">
      {/* Left Side Navigation */}
      <div className="w-1/4 bg-gray-800 text-white py-6 px-4">
        <div className="flex items-center justify-center">
          <img src={logo} className="w-12 h-12" alt="logo" />
        </div>
        <div className="mt-6">
          <Link
            to="/adminHome"
            className={`block py-2 px-4 rounded ${location.pathname === "/adminHome"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:bg-gray-700"
              }`}
          >
            Home
          </Link>
          <Link
            to="/company-list"
            className={`block py-2 px-4 rounded ${location.pathname === "/company-list"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:bg-gray-700"
              }`}
          >
            Company List
          </Link>

          <Link
            to="/admin/project-management"
            className={`block py-2 px-4 rounded ${location.pathname === "/admin/project-management"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:bg-gray-700"
              }`}
          >
            Projects
          </Link>

          <Link
            to="/admin/show-banner"
            className={`block py-2 px-4 rounded ${location.pathname === "/admin/show-banner"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:bg-gray-700"
              }`}
          >
            Banner
          </Link>

          <Link
            to="/users-list"
            className={`block py-2 px-4 rounded ${location.pathname === "/users-list"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:bg-gray-700"
              }`}
          >
            Users List
          </Link>
          <button
            className="block py-2 px-4 rounded text-gray-400 hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-3/4 bg-gray-100 p-6">


        <div className="flex flex-col lg:flex-row bg-gray-100 p-8 rounded-lg shadow-md space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-grow">
            <h1 className="text-2xl font-semibold mb-4">Edit User</h1>
            <form onSubmit={editUser} className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-3">
                  <h6 className="mb-0 text-sm font-medium">Full Name</h6>
                </div>
                <div className="text-secondary">
                  <input
                    type="text"
                    className="w-full py-2 px-4 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                    placeholder={data.name}
                    name="name"
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-3">
                  <h6 className="mb-0 text-sm font-medium">Email</h6>
                </div>
                <div className="text-secondary">
                  <input
                    type="text"
                    className="w-full py-2 px-4 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                    placeholder={data.email}
                    name="email"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>

  );
}

export default AdminUserEdit;
