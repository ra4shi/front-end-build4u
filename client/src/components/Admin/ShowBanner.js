import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

import logo from "../../logo.svg";

const BannerList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.post('https://buildforyou.site/api/admin/show-banner',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("admin_Secret"),
          },
        }
      );
      setBanners(response.data);
     
    } catch (error) {
      console.error('Error fetching banners:', error);
      navigate("/admin");
      localStorage.removeItem("admin_Secret");
    }
  };

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

        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Banner List</h1>
          <Link
            to="/admin/add-banner"
            className="block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            Add Banner
          </Link>
          <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white p-4 rounded-md shadow-md hover:bg-indigo-100 transition-colors"
              >
                <h2 className="text-lg font-semibold mb-2">{banner.title}</h2>
                <img
                  src={`https://buildforyou.site/public/${banner.image}`}
                  alt={banner.title}
                  className="w-full h-auto mb-2"
                />
                <p className="text-gray-700 mb-1">Note: {banner.link}</p>
                <p
                  className={`text-sm ${banner.isActive ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  Status: {banner.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>

  );
};

export default BannerList;
