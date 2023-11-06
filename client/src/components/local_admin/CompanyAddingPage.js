import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { localRequest } from '../../axios';
import { toast } from "react-hot-toast";

import logo from "../../logo.svg";
import { useLocation } from "react-router-dom";


const AddCompanyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };

  const [formData, setFormData] = useState({
    companyname: '',
    companyusername: '',

    aboutcompany: '',
    certifications: [],
    image: '',
    license: '',
  });

  const history = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [certificationPreviews, setCertificationPreviews] = useState([]);
  const [licensePreview, setLicensePreview] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);



  const handleCertificationsChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prevState) => ({
      ...prevState,
      certifications: files,
    }));

    // Create previews for the selected certifications
    const previews = files.map((file) => URL.createObjectURL(file));
    setCertificationPreviews(previews);
  };


  const handleLicenseChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      license: file,
    }));

    setLicensePreview(URL.createObjectURL(file));

  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataWithFiles = new FormData();
      formDataWithFiles.append('companyname', formData.companyname);
      formDataWithFiles.append('companyusername', formData.companyusername);

      formDataWithFiles.append('aboutcompany', formData.aboutcompany);
      formDataWithFiles.append('license', formData.license);
      formDataWithFiles.append('image', formData.image);
      formData.certifications.forEach((file) => {
        formDataWithFiles.append('certifications', file);
      });

      const response = await localRequest({
        url: '/api/localadmin/addcompanydetails',
        method: 'POST',
        data: formDataWithFiles,
      });

      if (response && response.data) {
        const { redirectTo, company } = response.data;
        if (redirectTo) {
          history(redirectTo);
        } else {

          toast.success("Details Added");
       

        }
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Error adding company details:', error);
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
      <div className="w-3/4 bg-gray-100 p-6">


      <div className="container-fluid px-1 py-5 mx-auto">
  <div className="row justify-content-center">
    <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">

      <div className="card">
        <h3 className="company-details-heading text-2xl font-semibold mb-4">Company Details</h3>
        <p className="blue-text text-blue-500">
          <br /> Enter company details properly
        </p>
        <h5 className="text-center mb-4"></h5>
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Enter your company name:
            </label>
            <input
              type="text"
              id="name"
              name="companyname"
              value={formData.companyname}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="block font-medium text-gray-700">
             ( Verification*) username: 
            </label>
            <input
              type="text"
              id="username"
              placeholder='Enter the same username used for registration .'
              name="companyusername"
              value={formData.companyusername}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="about" className="block font-medium text-gray-700">
              Enter About your Company:
            </label>
            <input
              type="text"
              id="about"
              name="aboutcompany"
              value={formData.aboutcompany}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="certification" className="block font-medium text-gray-700">
              Company Certification:
            </label>
            <input
              type="file"
              id="certification"
              name="certifications"
              multiple
              onChange={handleCertificationsChange}
              className="mt-1 w-full"
            />
            {/* Display image previews */}
            <div className="image-preview">
              {certificationPreviews.map((preview, index) => (
                <div key={index} className="image-box">
                  <img src={preview} alt={`Certification ${index}`} />
                  {/* Allow changing specific certification image */}
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="license" className="block font-medium text-gray-700">
              Company license:
            </label>
            <input
              type="file"
              id="license"
              name="license"
              onChange={handleLicenseChange}
              className="mt-1 w-full"
            />
            {/* Display image preview */}
            {licensePreview && <img className='imgcompany' src={licensePreview} alt="License" />}
          </div>
          <div className="form-group">
            <label htmlFor="image" className="block font-medium text-gray-700">
              Company Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 w-full"
            />
            {/* Display image preview */}
            {ImagePreview && <img className='imgcompany' src={ImagePreview} alt="Image" />}
          </div>
          <div className="row justify-content-end">
            <div className="form-group col-sm-6">
              <Link to="/localadmin/">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  Go to homepage
                </button>
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



      </div>
    </div>



  );
};

export default AddCompanyPage;



