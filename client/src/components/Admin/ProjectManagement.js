import Swal from 'sweetalert2';
import logo from "../../logo.svg";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


const AdminProjectApproval = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const {projectId} = useParams()
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.post("https://buildforyou.site/api/admin/project-management",
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("admin_Secret"),
          },
        });

      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
      navigate("/admin");
      localStorage.removeItem("admin_Secret");
    }
  };

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      const swalResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (swalResult.isConfirmed) {
        const response = await axios.post(
          "https://buildforyou.site/api/admin/update-status",
          {
            projectId: projectId,
            newStatus: newStatus,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("admin_Secret"),
            },
          }
        );
  
        if (response.data.message === "Project status updated successfully") {
          const updatedProjects = projects.map((project) =>
            project._id === projectId
              ? { ...project, status: newStatus }
              : project
          );
          setProjects(updatedProjects);
        }
      }
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const PassProjectId = (id) => {
  navigate('/admin/projectview')
  }
  

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
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="w-3/4 bg-gray-100 p-6">


        {/* <div className="input-group flex-nowrap mt-2 mb-2">
        <span className="input-group-text" id="addon-wrapping">
          <i className="fa fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          onChange={" "}
        />
      </div> */}
      
       
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Projects</h1>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Company Username</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                  <th className="py-2 px-4 text-left">View</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-100 transition-colors">
                    <td className="py-2 px-4">{project.name}</td>
                    <td className="py-2 px-4">{project.companyname}</td>
                    <td className="py-2 px-4">{project.status}</td>
                    <td className="py-2 px-4">
                      {project.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusUpdate(project._id, 'rejected')}
                          className="text-red-600 hover:underline focus:outline-none ml-2"
                        >
                          Reject
                        </button>
                      )}
                    </td>

                  <Link to={`/admin/projectview/${project._id}`}>
                  <button  className="text-grey-600 hover:underline focus:outline-none ml-2" >
                    <td className="py-2 px-4">See Info</td>

                    </button>
                    </Link>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>

  );
};

export default AdminProjectApproval;
