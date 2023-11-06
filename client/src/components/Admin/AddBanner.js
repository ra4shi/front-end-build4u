import logo from "../../logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { adminRequest } from "../../axios";
const AdminBannerAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    isActive: false,
    image: ''
  })
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };
  const [ImagePreview, setImagePreview] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFiles = new FormData();
      formDataWithFiles.append('title', formData.title);
      formDataWithFiles.append('link', formData.link);
      formDataWithFiles.append('image', formData.image);
      const response = await adminRequest({
        url: '/api/admin/add-banner',
        method: 'POST',
        data: formDataWithFiles,
      });

      if (response.data) {
        toast.success('Banner created successfully');
        navigate('/admin/show-banner')
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      toast.error('Failed to create banner');
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
          <h1 className="text-2xl font-semibold mb-4">Add Banner</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                Note:
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
              />
              {ImagePreview && <img className='imgcompany' src={ImagePreview} alt="Image" />}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              Add Banner
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AdminBannerAdd;
