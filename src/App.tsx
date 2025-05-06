import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Department from "./pages/Department";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import AppointmentForm from "./pages/appointment";
import SignupPage from "./pages/signup";
import Login from "./pages/Login";
import MyBookings from "./UserDashboard/MyBookings";
import Error from "./pages/Error";
import Profile from "./UserDashboard/UserProfile";
import UserDashboardLayout from "./UserDashboard/UserDashboardLayout";
import AllAppointments from "../src/UserDashboard/AllAppointments";
import Allusers from "../src/UserDashboard/AllUsers";
import AllDepartments from "./UserDashboard/AllDepartments";
import AllDoctors from "./UserDashboard/AllDoctors";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/appointment/:category/:name",
    element: <AppointmentForm />,
    errorElement: <Error />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "/department",
    element: <Department />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <UserDashboardLayout />, // Use the layout here
    errorElement: <Error />,
  },
      {
        path: '/mybookings',
        element: <MyBookings />,
        errorElement: <Error />,
      },
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <Error />,
      },
    {
      path: "/doctors",
      element: <Doctors />,
      errorElement: <Error />,
    },
    {
      path: "/contact",
      element: <Contact />,
      errorElement: <Error />,
    },
    {
      path: "/allappointments",
      element: <AllAppointments />,
      errorElement: <Error />,
    },
    {
      path: "/allusers",
      element: <Allusers />,
      errorElement: <Error />,
    },
  {
    path: "/alldepartments",
    element: <AllDepartments />,
    errorElement: <Error />,
  },
  {
    path: "/alldoctors",
    element: <AllDoctors />,
    errorElement: <Error />,
  }
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;