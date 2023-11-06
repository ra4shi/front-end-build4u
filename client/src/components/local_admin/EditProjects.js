import React, { useEffect, useState } from 'react'
import { localRequest } from '../../axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from "../../logo.svg";
import { useNavigate } from 'react-router-dom';

function EditProjects() {
    const location = useLocation();
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        navigate("/localadmin/login");
        localStorage.removeItem("localtoken");
    };


    const { projectId } = useParams()

    const [projectData, setProjectData] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        companyname: '',
        category: '',
        appointmentfee: '',
        aboutproject: '',
        images: [],
        projectcost: ''
    })

    const getData = () => {
        localRequest({
            url: `/api/localadmin/project-data/${projectId}`,
            method: 'GET',
        }).then((response) => {
            console.log(response.data)
            setProjectData(response.data.project)
            setFormData({
                name: response.data.project.name,
                companyname: response.data.project.companyname,
                category: response.data.project.category,
                appointmentfee: response.data.project.appointmentfee,
                aboutproject: response.data.project.aboutproject,
                projectcost: response.data.project.projectcost,
                images: formData.images
            })
        }).catch((error) => {
            console.log(error)
            toast('please login and try again')

            localStorage.removeItem("localtoken");
            navigate("/localadmin/login");
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleImagesChange = (event) => {
        const files = event.target.files;
        const imagePreviews = [];


        for (let i = 0; i < Math.min(files.length, 3); i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    imagePreviews.push(event.target.result);
                    if (imagePreviews.length === Math.min(files.length, 3)) {
                        setSelectedImages([...imagePreviews]);
                    }
                };

                reader.readAsDataURL(file);
            }
        }
    };


    const handelSubmit = (event) => {
        event.preventDefault()

    

        const formDataWithFiles = new FormData();
        formDataWithFiles.append('name', formData.name);
        formDataWithFiles.append('companyname', formData.companyname);
        formDataWithFiles.append('category', formData.category);
        formDataWithFiles.append('appointmentfee', formData.appointmentfee);
        formDataWithFiles.append('aboutproject', formData.aboutproject);
        for (let i = 0; i < formData.images.length; i++) {
            formDataWithFiles.append('images', formData.images[i]);
         

        }
        formDataWithFiles.append('projectcost', formData.projectcost);


        localRequest({
            url: '/api/localadmin/edit-project-data',
            method: 'post',
            data: formDataWithFiles
        }).then((response) => {
            if (response.data.success) {
                toast.success("Project updated successfully")
                navigate('/localadmin/projects')
            } else {
                toast.error('Project Update error')
                navigate('/localadmin/projects')
            }
        }).catch((error) => {
            console.log(error)
            toast.error('please login after try again')
        })

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



            <div className="w-3/4 bg-gray-100 p-6">







                <section class="bg-gray-100">
                    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">



                        <div class="rounded-lg bg-white p-8 border-black shadow-lg lg:col-span-3 lg:p-12 ">
                            <form onSubmit={handelSubmit} class="space-y-4">
                                <div >
                                    <h1>Project Name</h1>
                                    <label   for="name">Project Name</label>
                                    <input
                                        class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                        type="text"
                                        id='name'
                                        name='name'
                                        defaultValue={projectData?.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <h1>company Name</h1>
                                        <label   for="text">Company Name</label>
                                        <input
                                            class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                            type="text"
                                            name='companyname'
                                            defaultValue={projectData?.companyname}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <h1>Category</h1>
                                        <label   for="text">Category</label>
                                        <input
                                            class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                            type="text"
                                            name='category'
                                            defaultValue={projectData?.category}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <h1>Appointment Fee</h1>
                                        <label   for="text">Appointment Fee</label>
                                        <input
                                            class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                            type="text"
                                            name='appointmentfee'
                                            defaultValue={projectData?.appointmentfee}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <h1>About Project</h1>
                                            <label   for="message">About Project</label>

                                            <textarea
                                                class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                                defaultValue={projectData?.aboutproject}
                                                onChange={handleChange}
                                                name='aboutproject'
                                                rows="8"
                                                id="message"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <h1>Project Cost</h1>
                                            <label   for="message"> Project cost </label>

                                            <textarea
                                                class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                                defaultValue={projectData?.projectcost}
                                                onChange={handleChange}
                                                name='projectcost'
                                                placeholder="Enter project Cost Info"
                                                required
                                                rows="8"
                                                id="message"
                                            ></textarea>
                                        </div>

                                    </div>

                                    <div>
                                        <h1>Project Images</h1>
                                        <label   for="text">Project Images</label>
                                        <input
                                            multiple onChange={handleImagesChange}
                                            class="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                            type="file"
                                            name='images'
                                            id='images'
                                        />

                                    </div>

                                    <div className="image-preview">
                                        {selectedImages.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Image Preview ${index + 1}`}
                                                className="preview-image"
                                            />
                                        ))}
                                    </div>


                                </div>
                                <div class="mt-4">
                                    <button
                                        type="submit"
                                        class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>









            </div>
        </div>
    )
}

export default EditProjects