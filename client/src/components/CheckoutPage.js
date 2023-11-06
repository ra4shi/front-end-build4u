import React, { useState, useEffect } from "react";
import logo from '../logo.svg';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { request } from "../axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Checkout1 = () => {
 
    const navigate = useNavigate();
    const history = useNavigate()
    const countries = ["India"];
    const [menu, setMenu] = useState(false);
    const [country, setCountry] = useState("Country");
    const [projects, setProjects] = useState([])
    const { companyId } = useParams();
    const [company, setCompany] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')
    const [state, setState] = useState('')
    const [bookingdate, setBookingdate] = useState('')

    const changeText = (e) => {
        setMenu(false);
        setCountry(e.target.textContent);
    };




    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 7);

    const formattedDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        setBookingdate(formattedDate);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim().length == 0) {
            return toast.error({ message: 'Please fill Name' })
        } else if (address.trim().length == 0) {
            return toast.error({ message: 'Please fill Address' })
        } else if (state.trim().length == 0) {
            return toast.error({ message: 'Please fill State' })
        } else if (phone.trim().length == 0) {
            return toast.error({ message: 'Please fill phone' })
        } else if (city.trim().length == 0) {
            return toast.error({ message: 'Please fill City' })
        } else if (bookingdate.trim().length == 0) {
            return toast.error({ message: 'Please fill Booking Date' })
        } else {
         
            request({

                url: '/api/user/datasss',
                method: 'POST',
                data: { data: { name: name, city: city, pincode: pincode, phone: phone, state: state, address: address, companyId: companyId, bookingdate: bookingdate } },

            }).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    razorpayPayment(response.data.data)
                }
            })
                .catch((error) => {
                    console.log(error)
                    localStorage.removeItem("token");
                    navigate('/login')
                })
        };
    }




    useEffect(() => {
        const fetchProjects = async () => {
            try {

                const response = await axios.post(
                    `https://buildforyou.site/api/user/appointmentbooking/${companyId}`,
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }

                );

                const { success, project, company } = response.data;

                if (project) {
                    setProjects(project);
                    setCompany(company);
                    
                } else {
                    const { redirectTo } = response.data;
                    if (redirectTo) {
                        history(redirectTo);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);

                const { redirectTo } = error.response.data;
                if (redirectTo) {

                    history(redirectTo);
                }

            }
        }
        fetchProjects();
    }, [])




    function razorpayPayment(order) {
       
        var options = {
            "key": process.env.REACT_APP_RAZORPAYID,
            "amount": order * 10,
            "currency": "INR",
            "name": "Build4you ",
            "description": "pay the amount to confirm booking",
            //    "image": "/user/images/online-shopping.png",
            "order_id": order.id,
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "handler": function (response) {
                verifyPayment(response, order)
            },
            "prefill": {
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }

        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }



    const verifyPayment = async (payment, order) => {
        try {
           
            const response = await axios.post('https://buildforyou.site/api/user/bookorder', {
                payment: payment,
                order: order,
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            );
      
            if (response.data && response.data.redirectTo) {
                const redirectTo = response.data.redirectTo;
               

                navigate(redirectTo);
            } else {
                console.log("Invalid response from the API");
            }
        } catch (error) {
            console.log("Failed to redirect:", error);
        }
    };





    return (
        <div>
         <nav className="bg-white p-4 md:flex md:items-center md:justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-8 mr-4" />
                    <span className="text-black text-lg font-semibold">Build4You</span>
                </div>
                <div className="md:flex md:space-x-4">

                    <ul className="flex space-x-4 mt-4 md:mt-0">
                        <li>
                            <Link to={"/"}>
                            <p className="text-black hover:text-blue-300">
                                Home
                            </p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/companies"}>
                            <p className="text-black hover:text-blue-300">
                                Company
                            </p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/services"}>
                            <a className="text-black hover:text-blue-300">
                                Services
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/projects"}>
                            <a className="text-black hover:text-blue-300">
                                Projects
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/appointments"}>
                            <a className="text-black hover:text-blue-300">
                                Appointment
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user-profile"}>
                            <a className="text-black hover:text-blue-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8a5 5 0 00-10 0v4a5 5 0 0010 0V8z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 22h2a2 2 0 002-2v-1a7 7 0 00-7-7H9a7 7 0 00-7 7v1a2 2 0 002 2h2"
                                    />
                                </svg>
                            </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>


            <div className="flex justify-center items-center">
                <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                    <div className="flex flex-col justify-start items-start w-full space-y-9">
                        <div className="flex justify-start flex-col items-start space-y-2">
                            <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
                                <svg className="fill-stroke" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.91681 7H11.0835" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.91681 7L5.25014 9.33333" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.91681 7.00002L5.25014 4.66669" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <a className="text-sm leading-none" href="/project" >Back</a>
                            </button>
                            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Appointment</p>
                            <p className="text-base leading-normal sm:leading-4 text-gray-600">
                                Home {"/"} Projects {"/projects"} Projects-Details {""} Appointment
                            </p>
                        </div>

                        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                            <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                                <div className="relative overflow-hidden h-40 bg-cover bg-center">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={`https://buildforyou.site/public/${company?.image}`}

                                    />
                                    <a href="#!">
                                        <div className="absolute inset-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                    </a>
                                </div>
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">{company?.companyname}</p>
                                <div className="flex flex-col justify-start items-start w-full space-y-4">
                                    <p className="text-xl md:text-2xl leading-normal text-gray-800">{projects?.name}</p>
                                    <p className="text-base font-semibold leading-none text-gray-600">₹ {projects?.appointmentfee}</p>
                                    <p className="text-base font-semibold leading-none text-gray-600"> {projects?.projectcost}</p>
                                </div>
                                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                                    <img src={`https://buildforyou.site/public/${projects?.images && projects?.images[0]}`} alt="headphones" />
                                </div>
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Our Team Will Arrive At Your Address <br /><br /> Our Team Will Provide All Helps For  {projects.category}  </p>

                            </div>




                            <form onSubmit={handleSubmit} className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                                <label className="border border-transparent hover:border-gray-300 bg-gray-900 text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                                    <div>
                                        <p className="text-base leading-4">Appointment</p>
                                    </div>
                                </label>

                                <div className="flex flex-row justify-center items-center mt-6">
                                    <hr className="border w-full" />
                                    <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">Please Fill The Details</p>
                                    <hr className="border w-full" />
                                </div>

                                <div className="mt-8">
                                    <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <label className="mt-8 text-base leading-4 text-gray-800">Place Details</label>
                                <div className="mt-2 flex-col">
                                    <div>
                                        <input className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </div>
                                    <div className="flex-row flex">
                                        <input className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                                        <input className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                </div>

                                <label className="mt-8 text-base leading-4 text-gray-800">Contact Number</label>
                                <div className="mt-2 flex-col">
                                    <div>
                                        <input className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="number" placeholder="Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                </div>


                                <div className="mt-2 flex-col">

                                    <label className="mt-8 text-base leading-4 text-gray-800">State</label>
                                    <div className="mt-2 flex-col">
                                        <div>
                                            <input className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
                                        </div>
                                    </div>

                                </div>

                                <label className="mt-8 text-base leading-4 text-gray-800">Date For Appointment</label>
                                <div className="mt-2 flex-col">
                                    <input
                                        className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                        type="date"
                                        placeholder="Date"
                                        value={bookingdate}
                                        min={minDate.toISOString().split('T')[0]}
                                        onChange={(e) => setBookingdate(e.target.value)}
                                        required
                                    />
                                </div>

                                <button

                                    type="submit" className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-grey text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                                    <div>
                                        <p className="text-base leading-4">Pay ₹{projects?.appointmentfee}</p>
                                    </div>
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>




            {/* Footer  Section */}


            <div className="relative flex justify-start md:justify-center md:items-end ">
                <img className="absolute dark:hidden object-cover top-10 h-full w-full xl:mt-10 z-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_5_marketing_background.png" alt="background" />
                <div className="flex pt-36 md:pt-32 lg:pt-40 xl:pt-96   px-4 md:px-6  xl:px-20 flex-col justify-start items-start md:justify-center md:items-center relative z-10">
                    <div className="flex  flex-col items-start justify-start xl:justify-center xl:space-x-8 xl:flex-row">
                        <div className="flex justify-start items-center space-x-4">
                            <div className="cursor-pointer w-12">
                                <img src={logo} alt="logo" />
                            </div>
                            <p className="w-60 text-xl xl:text-2xl font-semibold leading-normal text-white">Build For You</p>
                        </div>
                        <div className="mt-12 xl:mt-0 grid grid-cols-1 sm:grid-cols-3 gap-y-12 sm:gap-y-0 w-full md:w-auto sm:gap-x-20 md:gap-x-28 xl:gap-8">
                            <div className="sm:w-40 md:w-auto xl:w-72 flex justify-start items-start flex-col space-y-6">
                                <h2 className="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Community</h2>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    About Us
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    Guidelines and how to
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    Quote from the best
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    How to start a blog
                                </button>
                            </div>

                            <div className="sm:w-40 md:w-auto xl:w-72 flex justify-start items-start flex-col space-y-6">
                                <h2 className="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Getting Started</h2>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    About Us
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    Guidelines and how to
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    Quote from the best
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    How to start a blog
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    Quote from the best
                                </button>
                                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                                    Guidelines and how to
                                </button>
                            </div>

                            <div className=" xl:w-72 flex justify-start items-start flex-col space-y-6">
                                <h2 className="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Resources</h2>
                                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                                    Accessibility
                                </button>
                                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                                    Usability
                                </button>
                                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                                    Marketplace
                                </button>
                                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                                    Design & Dev
                                </button>
                                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                                    Marketplace
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex  xl:justify-between xl:flex-row flex-col-reverse items-center xl:items-start w-full ">
                        <p className="mt-10 md:mt-12 xl:mt-0 text-sm leading-none text-white" >2020 The Good Company. All Rights Reserved</p>
                        <div className="mt-10 md:mt-12 xl:mt-0 md:flex-row flex-col flex md:justify-center w-full md:w-auto justify-start items-start space-y-4 md:space-y-0 md:items-center md:space-x-4 xl:space-x-6">
                            <button className="text-base leading-none text-white hover:text-gray-300">
                                Terms of service
                            </button>
                            <button className="text-base leading-none text-white hover:text-gray-300">
                                Privacy Policy
                            </button>
                            <button className="text-base leading-none text-white hover:text-gray-300">
                                Security
                            </button>
                            <button className="text-base leading-none text-white hover:text-gray-300">
                                Sitemap
                            </button>
                        </div>
                        <div className="flex  justify-start md:justify-end items-start  w-full md:w-auto md:items-center space-x-6 ">
                            <button className="text-white hover:text-gray-200 w-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.25 5.13282C22.406 5.49955 21.513 5.74116 20.5992 5.85001C21.5595 5.28769 22.2817 4.39434 22.6303 3.33751C21.7224 3.86841 20.7307 4.24092 19.6978 4.43907C19.2629 3.98322 18.7397 3.62059 18.1603 3.3732C17.5808 3.12581 16.9571 2.99884 16.327 3.00001C13.7761 3.00001 11.7117 5.03438 11.7117 7.5422C11.7099 7.89102 11.7499 8.23881 11.8308 8.57813C10.0016 8.49238 8.2104 8.02575 6.57187 7.2081C4.93333 6.39044 3.48351 5.23977 2.31516 3.8297C1.90527 4.52069 1.6885 5.30909 1.6875 6.11251C1.6875 7.68751 2.50922 9.0797 3.75 9.89532C3.01487 9.87787 2.29481 9.68331 1.65094 9.32813V9.38438C1.65094 11.5875 3.24469 13.4203 5.35406 13.8375C4.9574 13.9433 4.54864 13.9968 4.13812 13.9969C3.84683 13.9974 3.5562 13.9691 3.27047 13.9125C3.85687 15.7172 5.56359 17.0297 7.58531 17.0672C5.94252 18.3333 3.9256 19.0175 1.85156 19.0125C1.48341 19.012 1.11561 18.99 0.75 18.9469C2.85993 20.2942 5.31255 21.0068 7.81594 21C16.3172 21 20.9616 14.0766 20.9616 8.07188C20.9616 7.87501 20.9564 7.67813 20.947 7.48595C21.8485 6.84472 22.6283 6.04787 23.25 5.13282V5.13282Z" fill="currentColor" />
                                </svg>
                            </button>
                            <button className="text-white hover:text-gray-200 w-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 12.0645C22.5 6.26602 17.7984 1.56445 12 1.56445C6.20156 1.56445 1.5 6.26602 1.5 12.0645C1.5 17.3051 5.33906 21.649 10.3594 22.4374V15.1005H7.69266V12.0645H10.3594V9.75117C10.3594 7.12008 11.9273 5.66555 14.3255 5.66555C15.4744 5.66555 16.6763 5.87086 16.6763 5.87086V8.45508H15.3516C14.048 8.45508 13.6402 9.26414 13.6402 10.0957V12.0645H16.552L16.087 15.1005H13.6406V22.4384C18.6609 21.6504 22.5 17.3065 22.5 12.0645Z" fill="currentColor" />
                                </svg>
                            </button>
                            <button className="text-white hover:text-gray-200 w-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1.5C6.20297 1.5 1.5 6.20297 1.5 12C1.5 17.797 6.20297 22.5 12 22.5C17.797 22.5 22.5 17.8022 22.5 12C22.5 6.19781 17.797 1.5 12 1.5ZM18.6666 6.33984C19.8815 7.76805 20.6046 9.54925 20.7291 11.4202C18.8367 11.3217 16.5727 11.3217 14.7572 11.4914C14.5275 10.9116 14.2922 10.343 14.0353 9.79594C16.1288 8.88844 17.7422 7.69594 18.6666 6.33984ZM12 3.24984C14.0395 3.24634 16.0156 3.95866 17.5837 5.26266C16.6322 6.46547 15.1392 7.51266 13.2797 8.30297C12.2625 6.42188 11.092 4.80328 9.84375 3.52875C10.5482 3.3469 11.2725 3.25322 12 3.24984V3.24984ZM8.04047 4.20703C9.30375 5.46469 10.4906 7.06641 11.5298 8.94141C9.55547 9.54469 7.29141 9.89062 4.875 9.89062C4.41562 9.89062 3.9675 9.87422 3.52453 9.84656C3.83266 8.63935 4.3949 7.5118 5.17367 6.53927C5.95244 5.56673 6.92981 4.77161 8.04047 4.20703V4.20703ZM3.26625 11.5842C3.76406 11.6063 4.26703 11.617 4.77562 11.6119C7.53187 11.5791 10.0969 11.1469 12.3009 10.44C12.5088 10.8722 12.7056 11.3152 12.8916 11.7689C12.6252 11.8272 12.3637 11.9056 12.1092 12.0033C9.09609 13.2689 6.72281 15.3084 5.4375 17.775C4.02813 16.1814 3.25007 14.1274 3.24984 12C3.24984 11.8594 3.25547 11.7211 3.26625 11.5842ZM12 20.7502C10.056 20.7525 8.16724 20.1036 6.63516 18.907C7.8 16.5994 9.87797 14.6883 12.4978 13.5037C12.7439 13.3889 13.072 13.2961 13.4494 13.2141C13.7619 14.0778 14.0408 14.9747 14.2861 15.9047C14.6525 17.3083 14.9223 18.7354 15.0938 20.1759C14.1061 20.5543 13.0576 20.7489 12 20.7502V20.7502ZM16.7306 19.3556C16.5595 17.9001 16.2871 16.4584 15.9155 15.0408C15.728 14.3297 15.5166 13.6406 15.2869 12.968C17.0039 12.8273 19.0603 12.8475 20.6953 12.968C20.5512 14.2606 20.1206 15.5047 19.4347 16.6097C18.7488 17.7148 17.825 18.6529 16.7306 19.3556V19.3556Z" fill="currentColor" />
                                </svg>
                            </button>
                            <button className="text-white hover:text-gray-200 w-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1.5C6.20156 1.5 1.5 6.32344 1.5 12.2672C1.5 17.025 4.50937 21.0562 8.68125 22.4812C8.73977 22.494 8.79949 22.5002 8.85938 22.5C9.24844 22.5 9.39844 22.2141 9.39844 21.9656C9.39844 21.7078 9.38906 21.0328 9.38437 20.1328C9.03705 20.2142 8.68173 20.2567 8.325 20.2594C6.30469 20.2594 5.84531 18.6891 5.84531 18.6891C5.36719 17.4469 4.67813 17.1141 4.67813 17.1141C3.76406 16.4719 4.67344 16.4531 4.74375 16.4531H4.74844C5.80313 16.5469 6.35625 17.5687 6.35625 17.5687C6.88125 18.4875 7.58437 18.7453 8.2125 18.7453C8.62783 18.737 9.03673 18.6412 9.4125 18.4641C9.50625 17.7703 9.77812 17.2969 10.0781 17.025C7.74844 16.7531 5.29688 15.8297 5.29688 11.7047C5.29688 10.5281 5.70469 9.56719 6.375 8.81719C6.26719 8.54531 5.90625 7.44844 6.47812 5.96719C6.55483 5.94883 6.63368 5.94095 6.7125 5.94375C7.09219 5.94375 7.95 6.08906 9.36563 7.07344C11.0857 6.59218 12.9049 6.59218 14.625 7.07344C16.0406 6.08906 16.8984 5.94375 17.2781 5.94375C17.357 5.94095 17.4358 5.94883 17.5125 5.96719C18.0844 7.44844 17.7234 8.54531 17.6156 8.81719C18.2859 9.57187 18.6937 10.5328 18.6937 11.7047C18.6937 15.8391 16.2375 16.7484 13.8984 17.0156C14.2734 17.3484 14.6109 18.0047 14.6109 19.0078C14.6109 20.4469 14.5969 21.6094 14.5969 21.9609C14.5969 22.2141 14.7422 22.5 15.1312 22.5C15.1942 22.5003 15.2571 22.494 15.3187 22.4812C19.4953 21.0562 22.5 17.0203 22.5 12.2672C22.5 6.32344 17.7984 1.5 12 1.5Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default Checkout1;
