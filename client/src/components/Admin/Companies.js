
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns'
import logo from "../../logo.svg";
import { adminRequest } from '../../axios';
import Swal from 'sweetalert2';


function Companies() {

  const [company, setCompany] = useState([])
  const [Deleted, setDeleted] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const companyId = useParams()

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

  useEffect(() => {
    adminRequest({
      url: 'api/admin/company-list',
      method: 'get',

    }).then((response) => {
      if (response.data) {
      
        setCompany(response.data.companies)

        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    }).catch((error) => {
      console.log(error)
      toast.error('please login and try again')
      navigate("/admin");
      localStorage.removeItem("admin_Secret");
    })

  }, [Deleted])



  const handleDelete = (companyId) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {

          adminRequest({
            url: `/api/admin/delete-company/${companyId}`,
            method: 'delete',
          })
            .then((response) => {

            


              toast.success(response.data.message);

              setDeleted(response.data.success)

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
      

        <section class="bg-white py-1 lg:py-[120px]">

          <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white">Companies</p>
          <div class="container mx-auto">
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4">
                <div class="max-w-full overflow-x-auto">
                  <table class="w-full table-auto">
                    <thead>
                      <tr class="bg-primary text-center">
                        <th
                          class="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          Name
                        </th>
                        <th
                          class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          Duration
                        </th>
                        <th
                          class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          E-mail
                        </th>
                        <th
                          class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          Status
                        </th>
                        <th
                          class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          Verification Status
                        </th>
                        <th
                          class="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          Action
                        </th>
                        <th
                          class="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4"
                        >
                          View
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {company?.map((company) => (
                        <tr>
                          <td
                            class="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium"
                          >
                            {company.name}
                          </td>
                          <td
                            class="text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium"
                          >
                            {format(new Date(company.createdAt), "yyyy-MM-dd ")}
                          </td>
                          <td
                            class="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium"
                          >
                            {company.email}
                          </td>
                          <td
                            class="text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium"
                          >
                            {company.mobile}
                          </td>
                          <td
                            class="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium"
                          >
                            {company.isVerified}
                          </td>
                          <td
                            class="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium"
                          >
                            <button
                              onClick={() => handleDelete(company._id)}
                              class="border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-white"
                            >
                              Delete
                            </button>
                          </td>
                          <td
                            class="text-dark border-b border-r border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium"
                          >
                            <Link to={`/admin/companyView/${company._id}`} >
                              <a

                                class="border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-white"
                              >
                                Go To
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>







      </div>
    </div>

  )
}

export default Companies