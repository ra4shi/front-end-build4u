import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'
import { localRequest } from '../../axios';
import logo from "../../logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import io from 'socket.io-client';

function AppoinmentsLists() {
  const navigate = useNavigate();
  const location = useLocation();
   const socket=io.connect("https://buildforyou.site/")
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [bookings, setBookings] = useState([])

  const { appointmentId } = useParams()


  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
     
    const filtered = bookings.filter((booking) =>
      format(new Date(booking.date), "yyyy-MM-dd").includes(searchQuery)
    );
    setFilteredBookings(filtered);
  }, [searchQuery, bookings]);


  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };



  useEffect(() => {

    const fetchAppointment = async (req, res) => {

      try {
        const response = await axios.post(
          'https://buildforyou.site/api/localadmin/appointments',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('localtoken'),
            }
          }
        )
       
        setBookings(response.data.appointment)
      } catch (error) {
        console.log('Error Fetching Appointment', error);
        localStorage.removeItem("localtoken");
        navigate("/localadmin/login");
      }
    }
    fetchAppointment();
  }, []);

  


  const constructionupdate = (appointmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update to Success!',
    }).then((result) => {
      if (result.isConfirmed) {

      localRequest({
        url: `/api/localadmin/edit-contruction-status/${appointmentId}`,
        method: 'patch',  
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          window.location.reload();

        }
      })
      .catch((error) => {
        console.log('Error Fetching Appointment Status', error);
      });
  }
})
}


  const handleEdit = (appointmentId) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!',
    }).then((result) => {
      if (result.isConfirmed) {

        localRequest({
          url: `/api/localadmin/edit-appointment-status/${appointmentId}`,
          method: 'post',
        })
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
              window.location.reload();

            }
          })
          .catch((error) => {
            console.log('Error Fetching Appointment Status', error);
          });


      }
    })
  };
  const startChat=(id,companyId)=>{
    navigate("/localadmin/chat",{state:{id,companyId}})
  }




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
              placeholder="Search by Appointment Date (yyyy-MM-dd)"
              aria-label="Search"
              aria-describedby="addon-wrapping"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Booking Fee
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Appointment Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Contruction Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Chats
                  </th>
                  <th scope="col" class="px-6 py-3">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((data) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {data.projectName}
                    </th>

                    <td class="px-6 py-4">
                      {data.category}
                    </td>
                    <td class="px-6 py-4">
                      {data.amount}
                    </td>
                    <td class="px-6 py-4">
                      {format(new Date(data.date), "yyyy-MM-dd ")}
                      
                    </td>
                    <td className="px-6 py-4">
                      {data.appointmentstatus}
                      {data.appointmentstatus !== "approved" &&  (
                        <button
                          onClick={() => handleEdit(data._id, 'pending')}
                          className="ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Approve
                        </button>
                      )}

                    </td>

                    <td className="px-6 py-4" >
                    {data.contructionstatus}
                      {data.contructionstatus !== "success" && data.appointmentstatus =="approved" && (
                        <button
                        onClick={()=> constructionupdate (data._id, 'pending')}
                          className="ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                         On Going
                        </button>
                      )}
                    </td>
                 
                      <td class="px-6 py-4">
                        <button  onClick={()=>{startChat(data._id,data.companyId)}}  >

                            Chat
                        </button>
                      
                      </td>
                      <Link to={`/localadmin/appointmentdetails/${data._id}`}>
                        {console.log("datasss ", data)}

                      <td class="px-6 py-3">
                    View 
                    </td>

                    </Link>
                 
                  </tr>
                ))}

              </tbody>
            </table>
          </div>






        </div>
      </div>
    </div>
  )
}

export default AppoinmentsLists