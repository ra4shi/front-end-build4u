import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { adminRequest } from '../../axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../logo.svg";


function CompanyView() {
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

  const { companyId } = useParams()
  const [company, setCompany] = useState([]);
  const [projects, setProjects] = useState([])


  useEffect(() => {
    adminRequest({
      url: `/api/admin/companyView/${companyId}`,
      method: "GET",

    }).then((response) => {
    
      setProjects(response.data.projects)
      setCompany(response.data.company);
    }).catch((error)=>{
      
      navigate("/admin");
      localStorage.removeItem("admin_Secret");
    })
  }, [])




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


        <div className="flex justify-between mb-6">
          {/* ...Navigation links... */}
        </div>



        <div className="flex flex-col items-center">
          <img
            key={0}
            className="w-full h-64 object-cover rounded-lg mb-4"
            src={`https://buildforyou.site/public/${company?.image && company.image[0]}`}
            alt={`Company 0`}
          />
          <h1 className="text-3xl font-semibold">{company?.companyname}</h1>
          <p className="text-gray-600">Username: {company?.companyusername}</p>
          <br />
          <br />
          <h1 className="text-3xl font-semibold">{company?.companyname}'s Projects</h1>
        </div>


        {/* <Link to={`/projects/${company._id}`} className="mt-6 block w-full">
                        <div className="hover:bg-blue-700 text-black rounded-lg py-2 px-4">
                            <h2 className="text-lg font-semibold">Projects</h2>
                        </div>
                    </Link> */}



        {projects?.map((project, index) => (
          <div className="m-4" key={project._id}>
            
              <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img
                    src={`https://buildforyou.site/public/${project.images && project.images[0]}`}
                    alt="img-blur-shadow"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {project.name}
                  </h5>
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {project.category}
                  </h5>
                  <h2 className="mb-2 text-teal-500 block font-sans text-xl font-bold leading-snug tracking-normal antialiased">
                    {project.companyname}
                  </h2>
                  {/* <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {project.aboutproject}
            </p> */}
                </div>
                <div className="p-6 pt-0">
                  
                </div>
              </div>
             
          </div>
        ))}





        <div className="mt-6">

          <h2 className="text-lg font-semibold mt-4">About:</h2>
          <p className="text-gray-700 dark:text-gray-300">{company?.aboutcompany}</p>

          <div className="flex space-x-4 mt-4">
            <div className="flex-shrink-0 w-1/2">
              <img
                key={0}
                className="image-gallery grid grid-cols-3 gap-2"
                src={`https://buildforyou.site/public/${company?.license && company?.license[0]}`}
                alt={`Company License`}
              />
              <p className="text-gray-700 dark:text-gray-300">License Information</p>
            </div>

            <div className="flex-shrink-0 w-1/2">
              <img
                key={1}
                className="image-gallery grid grid-cols-3 gap-2"
                src={`https://buildforyou.site/public/${company?.certifications && company?.certifications[0]}`}
                alt={`Company Certifications`}
              />
              <p className="text-gray-700 dark:text-gray-300">Certifications Information</p>
            </div>
          </div>
        </div>

        {/* </div> */}
        {/* </div> */}







      </div>
    </div>

  )
}

export default CompanyView