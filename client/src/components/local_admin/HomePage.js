import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import ReactApexChart from 'react-apexcharts';
import { toast } from 'react-hot-toast'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { localRequest } from "../../axios";

function HomePage() {
  const [totalappointmentamount, setTotalappointmentamount] = useState('');
  const [ordercount, setOrdercount] = useState('');
  const [projectcount, setProjectcount] = useState('');
  const [ratingcount, setRatingcount] = useState('');
  const [completedcontruction, setCompletedcontruction] = useState('');

  const location = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/localadmin/login");
    localStorage.removeItem("localtoken");
  };




  useEffect(() => {
    localRequest({
      url: `/api/localadmin/dashboard`,
      method: "post"
    })
      .then((response) => {
       

        setTotalappointmentamount(response.data.totalappointmentamount);
        setOrdercount(response.data.ordercount);
        setProjectcount(response.data.projectcount);
        setRatingcount(response.data.ratingcount);

       
        const orderAmounts = response.data.order.map(item => parseInt(item.amount));
        const orderDates = response.data.order.map(item => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { month: 'short' }); 
        });

       
        setChartState({
          series: [
            {
              name: 'Order Amount',
              data: orderAmounts,
            },
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
            },
            title: {
              text: 'Order Amount by Month',
              align: 'left',
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: orderDates,
            },
          },
        });
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/localadmin/login");
        localStorage.removeItem("localtoken");
      });
  }, []);

  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    },
  });
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

      {/* Right Side Main Content */}
      <div className="w-3/4 bg-gray-100 p-6">
       
    <div class="flex flex-col md:flex-row">

 

<div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

<div id="chart" className="w-full">
      <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={350} />
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
                        <h5 class="font-bold uppercase text-gray-600">Total Appointments</h5>
                        <h3 class="font-bold text-3xl">{ordercount} <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></h3>
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
                        <h5 class="font-bold uppercase text-gray-600">Toatal Appointment taken Users</h5>
                        <h3 class="font-bold text-3xl"> 2 <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></h3>
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
                        <h5 class="font-bold uppercase text-gray-600">Completed Contruction</h5>
                        <h3 class="font-bold text-3xl">2</h3>
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
                        <h5 class="font-bold uppercase text-gray-600">Total Ratings</h5>
                        <h3 class="font-bold text-3xl">{ratingcount}</h3>
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
                        <h5 class="font-bold uppercase text-gray-600">Toatal Projects</h5>
                        <h3 class="font-bold text-3xl">{projectcount}<span class="text-red-500"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
 
        </div>
    </div>


    <div class="flex flex-row flex-wrap flex-grow mt-2">

       






    </div>
    
</div>
</div>
</div>
</div>

    


  );
}

export default HomePage;
