import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from "../../logo.svg";

 




const CompanyDetails = ({ localId }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const handleLogout = (e) => {

    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };



  const [companyData, setCompanyData] = useState(null);


  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.post(
        'https://buildforyou.site/api/localadmin/showcompany',
        { localId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('localtoken')}`,
          },
        }
      );

      if (!response) {
        navigate('/localadmin/addcompanydetails');
      }

      const { company, redirectTo } = response.data;

      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        
        setCompanyData(company);
      } 

      if (response.data.success) {
        navigate('/localadmin/showcompany');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error fetching company details:', error);
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

      {/* Right Side Main Content */}
      <div className="w-3/4 bg-gray-100 p-6">
        {companyData ? (
          <div className="w-3/4 bg-gray-100 p-6 border rounded-lg hover:shadow-md transition duration-300">
            <h1 className="text-xl font-bold mb-4">Company Details</h1>
            <p className="mb-2">Company Name: {companyData.companyname}</p>
            <p className="mb-2">Company Username: {companyData.companyusername}</p>

            <p className="mb-2">About Company: {companyData.aboutcompany}</p>
            <p className="mb-2">Certifications:</p>
            <div className="image-gallery grid grid-cols-3 gap-2">
              {companyData.certifications.map((certification, index) => (
                <img
                  className="company-details-img rounded"
                  key={index}
                  src={`https://buildforyou.site/public/${certification}`}
                  alt={`Image ${index}`}
                />
              ))}
            </div>
            <p className="mt-4">License:</p>
          
            {companyData.license && (
              
              <img
                src={`https://buildforyou.site/public/${companyData.license}`}
              
                alt="License Image"
                className="mt-2 rounded"
                style={{ maxWidth: "100%", height: "auto" }} // Inline style
              />
            )}
            <p className="mt-4">Company Image:</p>
            {companyData.image && (
              <img
                src={`https://buildforyou.site/public/${companyData.image}`}
                alt="Company Image"
                className="mt-2 rounded"
                style={{ maxWidth: "100%", height: "auto" }} // Inline style
              />
            )}
            <div className="mt-6 space-x-4">
              <Link to="/localadmin/">
                <button className="bg-red-500 block w-full hover:bg-blue-600 hover:text-white transition duration-300 py-2 px-4 rounded-md">
                  Go to homepage
                </button>
              </Link>
              <Link to={`/localadmin/edit-company/${companyData._id}`}>
                <button className="bg-red-500 block w-full hover:bg-blue-600 hover:text-white transition duration-300 py-2 px-4 rounded-md">
                  Edit Company
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p>Loading company details...</p>
        )}
      </div>

    </div>


  );
};

export default CompanyDetails;
