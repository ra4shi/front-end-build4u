import ReactApexChart from 'react-apexcharts';
import logo from "../../logo.svg";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { adminRequest } from '../../axios';

function AdminHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_Secret");
    navigate("/admin");
  };

  const [totalprojects , setTotalprojects] = useState('');
  const [totalcompanies , setTotalcompanies] = useState('');
const [totalappointmentamount , setTotalappointmentamount] = useState('')
const [totalorders , setTotalorders] = useState('')
const [totalratings , setTotalratings] = useState('')
const [ completedcontruction , setCompletedcontruction] = useState('')
const [order,setOrder]=useState([])

 

  adminRequest({
    url : '/api/admin/admindashbord',
    method : 'post',
  }).then((response) => {


  setTotalappointmentamount(response.data.totalappointmentamount)
  setTotalcompanies(response.data.totalcompany)
  setTotalprojects(response.data.totalproject)
  setTotalorders(response.data.totalorders)
  setTotalratings(response.data.totalratings)
  setCompletedcontruction(response.data.completedcontruction)
  setOrder(response.data.orders)

  }).catch((error) => {
 

    console.log(error)
  })
  const orderAmounts = order.map((order) => ({
    amount: parseInt(order.amount), // Convert amount to a number
    date: new Date(order.date).toLocaleDateString(), // Convert date to a readable format
  }));

  const amounts = orderAmounts.map((item) => item.amount);
  const dates = orderAmounts.map((item) => item.date);
 


  const chartData = {
    series: [
      {
        name: "Total Order Amount",
        data: amounts,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Total Order Amount Over Time",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: dates,
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Amount",
        },
        min: Math.min(...amounts) - 1000, // Adjust min and max values as needed
        max: Math.max(...amounts) + 1000,
      },
      legend: {
        show: false,
      },
    },
  };
  {console.log("orderooooo",order)}

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
      <div className="w-3/4 bg-gray-100 p-6">

      <div class="flex flex-col md:flex-row">

 

<div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

<div id="chart">
<ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
              />
    </div>

    <div class="bg-gray-800 pt-3">
        <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h3 class="font-bold pl-2">Analytics</h3>
        </div>
    </div>

    <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
 
            <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Appointment Fee</h5>
                        <h3 class="font-bold text-3xl">{totalappointmentamount} <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
    
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
         
            <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Projects</h5>
                        <h3 class="font-bold text-3xl">{totalprojects} <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></h3>
                    </div>
                </div>
            </div>
      
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
      
            <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Orders</h5>
                        <h3 class="font-bold text-3xl">{totalorders} <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
          
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
           
            <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total reviews</h5>
                        <h3 class="font-bold text-3xl">{totalratings}</h3>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
         
            <div class="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-indigo-600"><i class="fas fa-tasks fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">COntruction Completed</h5>
                        <h3 class="font-bold text-3xl">{completedcontruction}</h3>
                    </div>
                </div>
            </div>
           
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
    
            <div class="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-red-600"><i class="fas fa-inbox fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Companies</h5>
                        <h3 class="font-bold text-3xl">{totalcompanies} <span class="text-red-500"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
 
        </div>
    </div>


     
    
</div>
</div>

      </div>
    </div>
  );
}

export default AdminHome;
