import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import logo from '../../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const ProjectDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };

  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `https://buildforyou.site/api/localadmin/projects/${projectId}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("localtoken")
            }
          }

        );
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);

        localStorage.removeItem("localtoken");
        navigate("/localadmin/login");
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (

    <div className="flex">

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
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <div className="project-image-container">
            <img
              key={0}
              className="projcets-card-imgs"
              src={`https://buildforyou.site/public/${project.images && project.images[0]}`}
              alt={`Project 0`}
            />
          </div>
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </div>

        <div className="p-4">
          <h5 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-50">
            {project?.name}
          </h5>
          <h1 className='font-bold'>About Project</h1>
          <p className="text-base mb-4 text-neutral-600 dark:text-neutral-200">
            {project?.aboutproject}
          </p>
          <div className="project-image-container grid grid-cols-2 gap-4">
            {project?.images &&
              project?.images.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  className="projcets-card-img"
                  src={`https://buildforyou.site/public/${image}`}
                  alt={`Project ${index + 1}`}
                />
              ))}
          </div>
          <br/>
          <h1 className='font-bold'>Project Coast</h1>
            <p className="font-serif mb-4 text-neutral-600 dark:text-neutral-200">
              {project.projectcost}
            </p>
        </div>
      </div>



    </div>

  );
};

export default ProjectDetails;
