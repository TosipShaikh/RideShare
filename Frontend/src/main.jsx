import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./App/store.js";

//components
import {
  Navbar,
  BookRide,
  SearchRidePage,
  Cards,
  ContactUs,
  DriverProfile,
  DriverLogin,
  DriverSignUp,
  HomeMain,
  Layout,
  LogInOptions,
  OfferRide,
  RegistrationOptions,
  DriverRideHistory,
  RideBookSuccess,
  RideDetails,
  RidePlaced,
  Unauthorized,
  RideResults,
  SafetyPage,
  SupportPage,
  UserSignUpPage,
  UserLoginPage,
  DriverFeedbackForm,
  AboutUs,
  UserRideHistory,
  UserProfile,
} from "./components/index.js";
import {
  checkUserAuthLoader,
  checkDriverAuthLoader,
} from "./checkAuthLoader.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <>
            <HomeMain />
            <Cards />
          </>
        ),
      },
      {
        path: "searchride",
        element: <SearchRidePage />,
      },
      {
        path: "signup",
        element: <DriverSignUp />,
      },
      {
        path: "login",
        element: <DriverLogin />,
      },
      {
        path: "driverprofile",
        element: <DriverProfile />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "offer",
        element: <OfferRide />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "rideplaced",
        element: <RidePlaced />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "rideresults",
        element: <RideResults />,
      },
      {
        path: "driverridehistory",
        element: <DriverRideHistory />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "bookride",
        element: <BookRide />,
      },
      {
        path: "userlogin",
        element: <UserLoginPage />,
      },
      {
        path: "usersignup",
        element: <UserSignUpPage />,
      },
      {
        path: "ridebooksuccess",
        element: <RideBookSuccess />,
        loader: checkUserAuthLoader,
      },
      {
        path: "userridehistory",
        element: <UserRideHistory/>,
        loader: checkUserAuthLoader,
      },
      {
        path: "userprofile",
        element: <UserProfile />,
        loader: checkUserAuthLoader,
      },
      {
        path: "registrationoptions",
        element: <RegistrationOptions />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "safety",
        element: <SafetyPage />,
      },
      {
        path: "ridedetails",
        element: <RideDetails />,
        loader : checkUserAuthLoader,
      },
      {
        path: "loginoptions",
        element: <LogInOptions />,
      },
    ],
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
