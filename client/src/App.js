
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import UserProfileEdit from "./components/UserProfileEdit";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import PublicAdminRoute from "./components/Admin/PublicAdminRoute";
import ProtectAdminRoute from "./components/Admin/ProtectAdminRoute";
import UsersList from "./components/Admin/UsersList";
import AdminUserEdit from "./components/Admin/AdminUserEdit";
import Localadminregister from './components/local_admin/Register';
import LocaladminLogin from './components/local_admin/Login';
import LocalAdminPublicRoute from "./components/local_admin/LocalAdminPublicRoute";
import LocalAdminProtectedRoute from "./components/local_admin/LocalAdminProtectedRoute";
import LocalAdminHomePage from "./components/local_admin/HomePage";
import LocalAdminProfile from "./components/local_admin/LocalAdminProfile";
import LocalAdminProjects from "./components/local_admin/ProjectsPage";
import LocalAdminAddProject from "./components/local_admin/AddProject";
import ForgotPassword from "./components/Forgot";
import LocaladminShowCompany from './components/local_admin/showcompanydetails';
import LocalAdminaddCompany from './components/local_admin/CompanyAddingPage';
import ShowProjects from "./components/local_admin/ProjectsPage";
import GetProjectDetails from './components/local_admin/ProjectDetails'
import Projectmanagemnt from './components/Admin/ProjectManagement'
import AddBanner from './components/Admin/AddBanner'
import ShowBanner from './components/Admin/ShowBanner'
import ProjectsShowing from "./components/Projects";
import ProjectDetails from './components/ProjectSingle';
import Companies from './components/Companies'
import CompanyDetails from './components/CompanySingle';
import AppointmentBooking from "./components/CheckoutPage";
import EditCompany from "./components/local_admin/EditCompany";
import Appointmentlists from "./components/Appointments";
import LocalAdminAppointmentsLists from "./components/local_admin/AppoinmentsLists";
import Services from "./components/Services";
import CompaniesList from "./components/Admin/Companies";
import CompanyView from "./components/Admin/companyView";
import EditProjectByCompany from './components/local_admin/EditProjects'
import ChatUser from './components/Chat';
import ChatCompany from './components/local_admin/Chat'
import io from 'socket.io-client';
import ProjectViewAdmin from './components/Admin/ProjectSingleView'
import AppointmentAddress from './components/local_admin/AddressAppointment'
import Review from './components/Review'
import ErrorPage from './components/ErrorPage'

const socket = io.connect("https://buildforyou.site/")
console.log(socket)

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>


      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* User Side */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={


            <HomePage />

          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              {" "}
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile-edit"
          element={
            <ProtectedRoute>
              {" "}
              <UserProfileEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={

            <ProjectsShowing />

          } />

        <Route
          path="/project-details/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={

            <Companies />

          } />

        <Route
          path="/company-details/:companyId"
          element={
            <ProtectedRoute>
              <CompanyDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/appointmentbooking/:companyId"
          element={
            <ProtectedRoute>
              <AppointmentBooking />
            </ProtectedRoute>
          }

        />

        <Route
          path='/appointments'
          element={
            <ProtectedRoute>
              <Appointmentlists />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={

            <Services />

          }
        />



        <Route

          path="/chat"
          element={
            <ChatUser />
          }
        />


        <Route
          path="/getReview"
          element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>
          }
        />











        {/*local admin */}

        <Route
          path="/localadmin/login"
          element={
            <LocalAdminPublicRoute>
              <LocaladminLogin />
            </LocalAdminPublicRoute>
          }
        />
        <Route
          path="/localadmin/register"
          element={
            <LocalAdminPublicRoute>
              <Localadminregister />
            </LocalAdminPublicRoute>
          }
        />

        <Route
          path="/localadmin"
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <LocalAdminHomePage />
            </LocalAdminProtectedRoute>
          }

        />

        <Route
          path="/localadmin/profile"
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <LocalAdminProfile />
            </LocalAdminProtectedRoute>
          }

        />

        <Route
          path="/localadmin/projects"
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <LocalAdminProjects />
            </LocalAdminProtectedRoute>
          }

        />

        <Route
          path="/localadmin/addproject"
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <LocalAdminAddProject />

            </LocalAdminProtectedRoute>
          }

        />

        <Route
          path="localadmin/showcompany"
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <LocaladminShowCompany />
            </LocalAdminProtectedRoute>
          }
        />

        <Route
          path="localadmin/edit-company/:companyId"
          element={
            <LocalAdminProtectedRoute>
              <EditCompany />
            </LocalAdminProtectedRoute>
          }
        />

        <Route
          path='localadmin/addcompanydetails'
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <LocalAdminaddCompany />
            </LocalAdminProtectedRoute>
          }
        />

        <Route exact path="/localadmin/projects" component={ShowProjects} />


        <Route
          path="/localadmin/projects/:projectId"
          element={
            <LocalAdminProtectedRoute>
              {" "}
              <GetProjectDetails />
            </LocalAdminProtectedRoute>

          }
        />

        <Route
          path="/localadmin/appointments"
          element={
            <LocalAdminProtectedRoute>
              <LocalAdminAppointmentsLists />
            </LocalAdminProtectedRoute>
          }

        />



        <Route
          path="/localadmin/edit-project/:projectId"
          element={
            <LocalAdminProtectedRoute>
              <EditProjectByCompany />
            </LocalAdminProtectedRoute>
          }
        />


        <Route
          path="/localadmin/chat"
          element={
            <ChatCompany />
          }
        />


        <Route
          path="/localadmin/appointmentdetails/:orderId"
          element={
            <AppointmentAddress />
          }

        />




        {/* Admin side */}

        <Route
          path="/admin"
          element={
            <PublicAdminRoute>
              {" "}
              <AdminLogin />{" "}
            </PublicAdminRoute>
          }
        />
        <Route
          path="/adminHome"
          element={
            <ProtectAdminRoute>
              {" "}
              <AdminHome />{" "}
            </ProtectAdminRoute>
          }
        />
        <Route path="/users-list" element={
          <ProtectAdminRoute>
            <UsersList />
          </ProtectAdminRoute>
        } />
        <Route path="/admin-user-edit" element={
          <ProtectAdminRoute>
            <AdminUserEdit />
          </ProtectAdminRoute>
        } />

        <Route path="admin/project-management" element={
          <ProtectAdminRoute>
            <Projectmanagemnt />
          </ProtectAdminRoute>
        } />

        <Route path="/admin/add-banner" element={
          <ProtectAdminRoute>
            <AddBanner />
          </ProtectAdminRoute>
        } />

        <Route path="/admin/show-banner"
          element={
            <ProtectAdminRoute>
              <ShowBanner />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/company-list"
          element={
            <ProtectAdminRoute>
              <CompaniesList />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/companyView/:companyId"
          element={
            <ProtectAdminRoute>
              <CompanyView />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/projectview/:projectId"
          element={
            <ProtectAdminRoute>
              <ProjectViewAdmin />
            </ProtectAdminRoute>
          }
        />


        <Route
          path="*"
          element={
            <ErrorPage/>
          }
        />


      </Routes>
    </>
  );
}

export default App;
