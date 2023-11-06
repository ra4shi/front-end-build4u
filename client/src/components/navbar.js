import React from 'react'

function navbar() {
  return (
    <div> <nav className="bg-white p-4 md:flex md:items-center md:justify-between">
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
    </div>
  )
}

export default navbar