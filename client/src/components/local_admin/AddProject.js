import React, { useState } from 'react';
import { localRequest } from '../../axios';
import logo from "../../logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const AddProject = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };
  const location = useLocation();
  const [name, setName] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [category, setCategory] = useState('');
  const [aboutProject, setAboutProject] = useState('');
  const [appointmentfee, setAppointment] = useState('');
  const [images, setImages] = useState([]);
  const [projectcost, setProjectcost] = useState('');
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Store the selected files in state
    setSelectedImages(files);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    if (name.length === 0  || companyname.length === 0  || category.length === 0 || aboutProject.length === 0 || appointmentfee.length===0 || projectcost.length === 0) {
      toast.error('Please fill in all required fields. ');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('companyname', companyname);
      formData.append('category', category);
      formData.append('aboutproject', aboutProject);
      formData.append('appointmentfee', appointmentfee);
      formData.append('projectcost', projectcost);
      
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
  
      const response = await localRequest({
        url: '/api/localadmin/addproject',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
   
  
      setName('');
      setCompanyname('');
      setCategory('');
      setAboutProject('');
      setAppointment('');
      setProjectcost('');
      setImages([]);
      navigate('/localadmin/projects');
    } catch (error) {
      console.error('Error adding project:', error);
        
      localStorage.removeItem("localtoken");
      navigate("/localadmin/login");
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
            className={`block py-2 px-4 rounded ${location.pathname === "/localadmin/projects"
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
        <section class="bg-gray-100">
          <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">



            <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 ">
              <form onSubmit={handleSubmit} class="space-y-4">
                <div>
                  <label  for="name">Project Name</label>
                  <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter project name"
                     
                  />
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label   for="text">Company Name</label>
                    <input
                      class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                      type="text"
                      value={companyname}
                      onChange={(e) => setCompanyname(e.target.value)}
                      placeholder="Enter company name"
                       
                    />
                  </div>

                  <div>
                    <label  for="text">Category</label>
                    <input
                      class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Enter category"
                       
                    />
                  </div>

                  <div>
                    <label   for="text">Appointment Fee</label>
                    <input
                      class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                      type="text"
                      value={appointmentfee}
                      onChange={(e) => setAppointment(e.target.value)}
                      placeholder="Enter appointment fee"
                       
                    />
                  </div>

                  <div>
                    <div>
                      <label   for="message">About Project</label>

                      <textarea
                        class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                        value={aboutProject}
                        onChange={(e) => setAboutProject(e.target.value)}
                        placeholder="Enter project description"
                         
                        rows="8"
                        id="message"
                      ></textarea>
                    </div>

                    <div>
                      <label   for="message">About Project</label>

                      <textarea
                        class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                        value={projectcost}
                        onChange={(e) => setProjectcost(e.target.value)}
                        placeholder="Enter project Cost Info"
                         
                        rows="8"
                        id="message"
                      ></textarea>
                    </div>

                  </div>

                  <div>
                    <label   for="text">Project Images</label>
                    <input
                      onChangeCapture={handleImageChange}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                      type="file" multiple onChange={(e) => setImages(e.target.files)}
                       
                    />
                    <div id="image-preview-container">
                      {selectedImages.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          className="preview-image"
                          style={{ maxWidth: '100px' }} // Adjust as needed
                        />
                      ))}
                    </div>
                  </div>





                </div>



                <div class="mt-4">
                  <button
                    type="submit"
                    class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>

        </section>

        {/* Right Side Main Content */}



      </div>
    </div>
  );
};

export default AddProject;
