import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from "../../logo.svg";
import { localRequest } from '../../axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../../redux/alertsSlice";

function EditCompany() {
  const dispatch = useDispatch()

  const { companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  const [companyData, setCompanyData] = useState([])
  const [formData, setFormData] = useState({
    companyname: '',
    aboutcompany: '',
    certifications: [],
    image: '',
     
  });


   
  const getData = () => {
    localRequest({
      url: '/api/localadmin/company-data',
      method: 'get',
    }).then((response) => {
      if (response.data.success) {
        setCompanyData(response.data.data)
        setFormData({
          companyname: response.data.data.companyname,
          aboutcompany: response.data.data.aboutcompany,
          certifications: formData.certifications,
           
          image: formData.image,
        });
      } else {
        toast('fail')
      }
    }).catch((error) => {
      toast('please login after try again')
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));

   

  };

  const handelSubmit = (event) => {
   
    event.preventDefault();

    if (formData.companyname.trim() === ''||formData.aboutcompany.trim() === "" ) {
      toast.error('Please fill the blank...!');
     
    }

 
    if ( formData.aboutcompany.length === 0 ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    
   
    const formDataWithFiles = new FormData();
    formDataWithFiles.append('companyname', formData.companyname);
    formDataWithFiles.append('aboutcompany', formData.aboutcompany);
    formDataWithFiles.append('image', formData.image);
  

  
    localRequest({
      url: '/api/localadmin/edit-company-data',
      method: 'patch',
      data: formDataWithFiles,
    })
      .then((response) => {
        dispatch(hideLoading())
        if (response.data.success) {
          
          toast.success(response.data.message);
          navigate('/localadmin/showcompany');
        } else {
          toast.error(response.data.message);
          navigate('/localadmin/showcompany');
        }
      })
      .catch((error) => {
        dispatch(hideLoading())
        
        toast.error('Please try again.');
  
        localStorage.removeItem("localtoken");
        navigate("/localadmin/login");
      });
  };
  

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
            // onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>


        <div className="container-fluid px-1 py-5 mx-auto">
          <div className="flex justify-center">
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 text-center">

              <div className="bg-white shadow-lg rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4">Company Details</h3>
                <p className="text-blue-500">
                  Enter company details properly
                </p>
               
                <h5 className="text-center mb-4"></h5>
                <form onSubmit={handelSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium text-gray-700">
                      Enter your company name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="companyname"
                      defaultValue={companyData?.companyname}
                      onChange={handleChange}
                      className="border rounded-md py-2 px-3 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="about" className="block font-medium text-gray-700">
                      Enter About your Company:
                    </label>
                    <textarea
                      type="text"
                      id="about"
                      name="aboutcompany"
                      defaultValue={companyData.aboutcompany}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                    />
                  </div>
 

                 

                  <div className="mb-4">
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
                    <img
                      src={`https://buildforyou.site/public/${companyData?.image?.[0]}`}
                      alt=''
                      className="mt-2 max-w-xs"
                    />
                  </div>

                  <div className="flex justify-end">
                    <div className="w-full sm:w-1/2">
                      <Link to="/localadmin/" className="block mb-2">
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
}

export default EditCompany;
