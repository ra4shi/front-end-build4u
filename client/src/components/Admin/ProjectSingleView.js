import React from 'react'
import { useEffect ,  useState  } from 'react'
import { useLocation, useNavigate, useParams  } from 'react-router-dom'
import { adminRequest } from '../../axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import logo from "../../logo.svg";

function ProjectSingleView() {
 const location = useLocation()
 const { projectId } = useParams()
 const [projects , setProjects] = useState([])
 const [company , setCompany ] = useState([])
 const navigate = useNavigate()


 const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

 useEffect(() => {

     adminRequest({
         url : `/api/admin/projectview/${projectId}`,
         methode : 'get'
        }).then((response)=> {
         
            
            if (response.data.success) {
                setCompany(response.data.company[0]);
                
                setProjects(response.data.project);
            }
            
            
        }).catch((error)=>{
            console.error('Error fetching projects:', error);
            localStorage.removeItem("token");
            navigate('/login')
        })
        
    },[projectId])

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
          className={`block py-2 px-4 rounded ${location.pathname === "/admin/company-list"
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

    <div className="flex flex-col items-center">
        <img
          key={0}
          className="w-60 h-60 object-cover rounded-lg mb-2"
          src={`https://buildforyou.site/public/${company.image && company.image[0]}`}
          alt={`Company 0`}
        />
        <Link to={`/company-details/${company._id}`}  >
          <h1 className="text-3xl font-semibold mb-2">{company.companyname}</h1>
          <p className="text-gray-600 mb-4">Username: {company.companyusername}</p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold">Company Details</h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {/* Add company details here */}

            </p>

          </div>

        </Link>
      </div>



      <div className="cardss block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <div className="project-image-container">
            <img
              key={0}
              className="projcets-card-imgs"
              src={`https://buildforyou.site/public/${projects.images && projects.images[0]}`}
              alt={`Project 0`}
            />
          </div>
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </div>

        <div className="p-4">
          <h2 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {projects.name}
          </h2>
          <h5 className="mb-2 text-x font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            ABOUT
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {projects.aboutproject}
          </p>
          <div className="project-image-container grid grid-cols-2 gap-4">
            {projects.images &&
              projects.images.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  className="projcets-card-img"
                  src={`https://buildforyou.site/public/${image}`}
                  alt={`Project ${index + 1}`}
                />
              ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">PROJECT COST DETAIL</h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {projects?.projectcost}
            </p>
 
          </div>

         
         

        </div>
      </div>




        </div>
        </div>

  )
}

export default ProjectSingleView