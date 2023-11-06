import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";

function UserProfile() {


  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [data, setData] = useState("");
  const [url, setUrl] = useState("");



  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64) => {
    dispatch(showLoading());

    const response = await axios.post(
      "https://buildforyou.site/api/localadmin/uploadImage",
      {
        image: base64,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("localtoken"),
        },
      }
    );
    dispatch(hideLoading());

    if (response.data.success) {
      setUrl(response.data);
      toast.success("profile updated successfully")
    } else {
      console.log("error");
        
    localStorage.removeItem("localtoken");
    navigate("/localadmin/login");
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }
  };


  const getdata = async () => {
    try {
      const response = await axios.post(
        "https://buildforyou.site/api/localadmin/profile",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("localtoken"),
          },
        }
      );
      setData(response.data.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [url]);




  return (
    <div>
      <div className="flex">
        {/* Left Side Navigation */}
        <div className="w-1/4 bg-gray-800 text-white py-6 px-4">
          <div className="flex items-center justify-center">
            <img src={logo} className="w-12 h-12" alt="logo" />
          </div>
          <div className="mt-6">
            <Link
              to="/localadmin"
              className={`block py-2 px-4 rounded ${location.pathname === "/localadminHomePage"
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700"
                }`}
            >
              Home
            </Link>

            <Link
              to="/localadmin/showcompany"
              className={`block py-2 px-4 rounded ${location.pathname === "/localadmin/showcompany"
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700"
                }`}
            >
              Company details
            </Link>

            <Link
              to="/localadmin/projects"
              className={`block py-2 px-4 rounded ${location.pathname === "/projects"
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700"
                }`}
            >
              Projects
            </Link>

            <Link
              to="/localadmin/appointments"
              className={`block py-2 px-4 rounded ${location.pathname === "/appointments"
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700"
                }`}
            >
              Appointments
            </Link>

            <Link
              to="/localadmin/profile"
              className={`block py-2 px-4 rounded ${location.pathname === "/localadmin/profile"
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700"
                }`}
            >
              Admin Profile
            </Link>
            <Link
              className="block py-2 px-4 rounded text-gray-400 hover:bg-gray-700"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>

        <div className="w-3/4 bg-gray-100 p-6">


          <div className="home-container-right">
            <h1 className="text-center">Admin Profile</h1>
            <div className="main-container">
              {/* profile content */}
           

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={data?.profile}
                        alt="Admin"
                        className="rounded-full w-32 h-32"
                      />
                      <div className="my-3">
                        <h4>{data?.name}</h4>
                         
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="mb-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="text-gray-700">{data?.name}</div>
                    <hr className="my-4" />
                    <div className="mb-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="text-gray-700">{data?.email}</div>
                    <hr className="my-4" />
                    <div className="mb-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="text-gray-700">{data?.mobile}</div>

                    <hr className="my-4" />
                     
                  </div>
                </div>
              </div>


              {/* end profile content */}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}

export default UserProfile;
