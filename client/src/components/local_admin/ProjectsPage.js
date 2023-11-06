import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../logo.svg";
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { localRequest } from '../../axios';

const ShowProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(
          "https://buildforyou.site/api/localadmin/projects",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("localtoken"),
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        localStorage.removeItem("localtoken");
        navigate("/localadmin/login");
      }
    };

    fetchProjects();
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the projects based on the search query
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProjects(filtered);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };

  const handleDelete = (projectId) => {
    Swal.fire({
      title: 'Are you sure To Delete This project?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localRequest({
          url: `/api/localadmin/delete-project/${projectId}`,
          method: 'patch',
        })
          .then((response) => {
           
            if (response.data.success) {
              toast.success(response.data.message);
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error('Error deleting company:', error);
          });
      }
    });
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
            className={`block py-2 px-4 rounded ${location.pathname === "/localadmin/appointments"
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
      <div className="input-group flex-nowrap mt-2 mb-2">
        <span className="input-group-text" id="addon-wrapping">
          <i className="fa fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Project Name"
          aria-label="Search"
          aria-describedby="addon-wrapping"
          onChange={handleSearchInputChange}
          value={searchQuery}
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold">Projects List</h1>
        <ul>
          {searchQuery
            ? filteredProjects.length > 0
              ? filteredProjects.map((project) => (
                  <li key={project._id} className="mt-4">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-gray-700">Company: {project.companyname}</p>
                    <p className="text-gray-700">Category: {project.category}</p>
                    <p className="text-gray-700">Status: {project.status}</p>
                    <Link
                      to={`/localadmin/edit-project/${project._id}`}
                      className="text-blue-600 hover:underline inline-block mt-2"
                    >
                      Edit Details
                    </Link>
                    <hr className="my-4" />
                    <div className="flex justify-between items-center">
                      <Link to={`/localadmin/projects/${project._id}`}>
                        <button className="btn-secondary bg-blue-500 hover:bg-yellow-500 hover:text-white transition duration-300 py-2 px-4 rounded-md">
                          viewDetails
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(project._id)} className="btn-red bg-yellow-500 hover:bg-red-600 hover:text-white transition duration-300 py-2 px-4 rounded-md">
                        Delete
                      </button>
                    </div>
                    <br />
                    <br />
                  </li>
                ))
              : <p>No projects match your search query.</p>
            : projects.length > 0
            ? projects.map((project) => (
                <li key={project._id} className="mt-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-gray-700">Company: {project.companyname}</p>
                  <p className="text-gray-700">Category: {project.category}</p>
                  <p className="text-gray-700">Status: {project.status}</p>
                  <Link
                    to={`/localadmin/edit-project/${project._id}`}
                    className="text-blue-600 hover:underline inline-block mt-2"
                  >
                    Edit Details
                  </Link>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <Link to={`/localadmin/projects/${project._id}`}>
                      <button className="btn-secondary bg-blue-500 hover:bg-yellow-500 hover:text-white transition duration-300 py-2 px-4 rounded-md">
                        viewDetails
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(project._id)} className="btn-red bg-yellow-500 hover:bg-red-600 hover:text-white transition duration-300 py-2 px-4 rounded-md">
                      Delete
                    </button>
                  </div>
                  <br />
                  <br />
                </li>
              ))
            : (
                <div>
                  <p className="mt-4">No projects available.</p>
                  <p className="mt-4">
                    Before Adding Project Please Add Company Details.
                  </p>
                </div>
              )}
        </ul>
        <Link to="/localadmin/addproject" className="mt-6">
          <button className="bg-black text-yellow-700 block hover:bg-blue-600 hover:text-white transition duration-300 py-2 px-4 rounded-md">
            Add Project
          </button>
        </Link>
      </div>
    </div>

    </div>

  );
};

export default ShowProjects;
