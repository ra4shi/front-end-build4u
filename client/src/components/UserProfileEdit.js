import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import logo from "../logo.svg";
import { request } from '../axios';
import { Link } from 'react-router-dom';

function UserProfileEdit() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    profile: null, // Use null instead of an empty string for file inputs
  });

  // State variables for error messages
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const getData = () => {
    request({
      url: '/api/user/user-data',
      method: 'get',
    })
      .then((response) => {
     
        setUserData(response.data.data);
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
          mobile: response.data.data.mobile,
          profile: null, // Initialize profile as null
        });
      })
      .catch((error) => {
        console.log(error);
        toast('Please Logout and Login Again');
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profile: file,
    }));
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    const { name, mobile } = formData;

    // Clear previous error messages
    setNameError('');
    setMobileError('');

    if (!name || name.length < 5 || ! !/^\d{10}$/.test(name)) {
      setNameError('Name must be at least 2 characters long.');
      return;
    }

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formDataWithFiles = new FormData();
    formDataWithFiles.append('name', formData.name);
    formDataWithFiles.append('email', formData.email);
    formDataWithFiles.append('mobile', formData.mobile);
    formDataWithFiles.append('profile', formData.profile);

    console.log(formDataWithFiles);

    request({
      url: '/api/user/edit-user-data',
      method: 'patch',
      data: formDataWithFiles,
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/user-profile');
        } else {
          toast.error('Something went wrong');
          navigate('/user-profile');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Please login and try again');
        navigate('/login');
      });
  };


  return (
    <div>

      <nav className="bg-white p-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-4" />
          <span className="text-black text-lg font-semibold">Build4You</span>
        </div>
        <div className="md:flex md:space-x-4">
         
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

      <h2>Edit User Profile</h2>
   


      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 text-center">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">User Profile</h3>

              <form onSubmit={handelSubmit} className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Enter your name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={userData?.name}
                  onChange={handleChange}
                  className="border rounded-md py-2 px-3 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                />
                   <span className="error text-red-600">{nameError}</span>

               

                <label htmlFor="mobile" className="block font-medium text-gray-700 mt-4">
                  Enter your Mobile:
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  defaultValue={userData?.mobile}
                  onChange={handleChange}
                  className="border rounded-md py-2 px-3 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                />
              
                 <span className="error">{mobileError}</span>

                <label htmlFor="image" className="block font-medium text-gray-700 mt-4">
                  User Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="profile"
                  onChange={handleImageChange}
                  className="mt-1 w-full"
                />
                <img
                  src={`https://buildforyou.site/public/${userData?.profile?.[0]}`}
                  alt=""
                  className="mt-2 max-w-xs"
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default UserProfileEdit;
