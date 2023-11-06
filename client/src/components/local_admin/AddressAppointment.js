import React, { useEffect, useState } from 'react'
import { localRequest } from '../../axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from "../../logo.svg";


function AddressAppointment() {

    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = (e) => {
        e.preventDefault();
        navigate("/localadmin/login");
        localStorage.removeItem("localtoken");
    };

    const { orderId } = useParams()
    const [address, setAddress] = useState('')
    const [orderdetail, setOrderdetail] = useState('')
    const [project, setProject] = useState('')

    useEffect(() => {

        localRequest({
            url: `/api/localadmin/appointmentdetails/${orderId}`,
            method: 'get'
        }).then((response) => {

         

            setAddress(response.data.address)
            setOrderdetail(response.data.order)
            setProject(response.data.project)
        })

    }, [orderId])



    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update the date every second

        return () => {
            clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
    }, []);

    const formattedDate = currentDate.toLocaleDateString('en-GB');

    function formatBookingDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }


    const formattebookingdDate = formatBookingDate(address.bookingdate);


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


                <div>
                    <div class="grid gap-10 row-gap-8 lg:grid-cols-5">
                        <div class="lg:col-span-2">
                            <p class="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                {formattedDate}
                            </p>
                            <div class="mb-3">
                                <a href="/" aria-label="Article" class="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-400">
                                    <p class="font-bold text-gray-800">
                                        The Appointment Address For Our Client , And Contact Information
                                    </p>
                                </a>
                            </div>

                            <div class="flex items-center">
                                <a href="/" aria-label="Author" class="mr-3">
                                    <img alt="avatar" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" class="object-cover w-10 h-10 rounded-full shadow-sm" />
                                </a>
                                <div>
                                    <a href="/" aria-label="Author" class="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">{address.name}</a>
                                    <p class="text-sm font-medium leading-4 text-gray-600">Client</p>
                                </div>
                            </div>

                            <h1 class="font-serif text-yellow-800 text-xl font-extrabold leading-none tracking-tight lg:text-4xl xl:text-5xl">ADDRESS</h1>

                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl">Booked Date : </p>   {formattebookingdDate}
                            </p>

                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl">Client Name : </p>   {address?.name}
                            </p>

                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl">Booked Address : </p>  {address.address}
                            </p>

                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl"> Address Pincode : </p>  {address.pincode}
                            </p>

                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl"> City : </p>   {address.city}
                            </p>
                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl"> State : </p>  {address.state}
                            </p>
                            <p class="mb-4 text-base text-gray-700 md:text-lg">
                                <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl">Booked Number : </p>  {address.phone}
                            </p>


                        </div>
                        <div class="flex flex-col space-y-8 lg:col-span-3">
                            <div>

                                <div class="mb-3">

                                    <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                                        Appointment Booking Information
                                    </p>

                                </div>
                                <p class="mb-4 text-base text-gray-700 md:text-lg">
                                    <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl text-blue-700 ">Appointment Taken Project Details: </p>   {orderdetail.projectName} <br />

                                    {orderdetail.category}
                                </p>

                                <p className='font-serif font-bold'>Appointment status : {orderdetail.appointmentstatus}</p>
                                <p className='font-serif font-bold'>Contruction status : {orderdetail.contructionstatus}</p>
                                <p className='font-mono font-bold'>Appointment Fee : {orderdetail.amount}</p>

                            </div>


                            <div>
                                <div class="mb-3">
                                    <a href="/" aria-label="Article" class="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-400">
                                        <p class="font-serif text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                                            {project.name}
                                        </p>
                                    </a>
                                </div>
                                <p class="mb-4 text-base text-gray-700 md:text-lg">
                                    {project.aboutproject}
                                </p>


                                <p className='font-extrabold font-bold text-red-800'>Visit The Client And Build An Amazing Concepts For Their Idea </p>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AddressAppointment