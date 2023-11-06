import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";

import { toast } from "react-hot-toast";
import axios from "axios";

function UsersList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

 
  const getData = async () => {
    try {

     
      const token = process.env.admin_Secret;

    
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      const response = await axios.post("https://buildforyou.site/api/admin/users-list",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin_Secret"),
          },
        }
      );


      if (response.data.success) {
        setUsers(response.data.users);
       
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
      
        toast.error("You are not authorized. Please log in.");

      } else {

        console.log(error);
        toast.error("Something went wrong");
      }
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
            to="/admin/company-list"
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


        <div className="home-container-right">
          <div className="main-container">
            <h1>Users List</h1>
            {/* Template Start */}
           
            <div className="input-group flex-nowrap mt-2 mb-2">
              <span className="input-group-text" id="addon-wrapping">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">User List</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-500 text-white">
                      <th className="py-3 px-4">
                        <span>User</span>
                      </th>
                      <th className="py-3 px-4">
                        <span>Created</span>
                      </th>
                      <th className="py-3 px-4 text-center">
                        <span>Status</span>
                      </th>
                      <th className="py-3 px-4">
                        <span>Email</span>
                      </th>
                      <th className="py-3 px-4">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((user) =>
                        search.toLowerCase() === ""
                          ? user
                          : user.name.toLowerCase().includes(search)
                      )
                      .map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-indigo-100 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <img
                                src={`https://buildforyou.site/public/${user?.profile}`}
                                alt={user?.profile}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <p className="text-sm">{user?.name}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user?.createdAt}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <p>{user?.email}</p>
                          </td>
                          <td className="py-3 px-4">
                        
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
  );
}

export default UsersList;
