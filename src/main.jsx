import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./Layout";
import OrderList from "./pages/Orders/OrderList";
import Products from "./pages/Products/Products";
import PublishGig from "./pages/PublishGig/PublishGig";
import CreateNewGig from "./pages/CreateNewGig/CreateNewGig";
import CreateNewGig2 from "./pages/CreateNewGig/CreateNewGig2";
import CreateNewGig3 from "./pages/CreateNewGig/CreateNewGig3";
import CreateNewGig4 from "./pages/CreateNewGig/CreateNewGig4";
import CreateNewGig5 from "./pages/CreateNewGig/CreateNewGig5";
import CreateNewGig6 from "./pages/CreateNewGig/CreateNewGig6";
import AppAnalytics from "./pages/Analytics/AppAnalytics";
import Customers from "./pages/Customers/Customers";
import Detail from "./pages/Customers/Detail";
import Profile from "./pages/Profile/Profile";
import Chat from "../src/pages/Chat/Chat";
import Setting from "./pages/Setting/Setting";
import ContactUs from "./pages/ContactUs.jsx/ContactUs";
import ContactForm from "./pages/ContactUs.jsx/ContactForm";
import Earnings from "./pages/Earnings/Earnings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profilepage from "./pages/Profilepage";
import Findjob from "./pages/Findjob";
import Giglist from "./pages/giglist";
import AboutSeller from "./pages/AboutSeller";
import OrderDetails from "./pages/OrderDetails";
import SubmittedOrder from "./pages/SubmittedOrder";
import PayOrder from "./pages/Payorder";
import JobDetails from "./pages/JobDetails";
import JobDetailstwo from "./pages/JobDetailstwo";
import PostaJob from "./pages/PostaJob";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/Setting/ForgotPassword";
import Layout2 from "./Layout2";
import ManagePaymentMethods from "./pages/ManagePaymentMethods/ManagePaymentMethods";
import { Toaster } from "react-hot-toast";
import ConfirmPassword from "./pages/Setting/ConfirmPassword";
import Otp from "./pages/Setting/Otp";
import FavouriteGigs from "./pages/FavouriteGigs";
import Blogs from "./pages/Blogs";
import Guides from "./pages/Guides";
import ProductivityHacks from "./pages/ProductivityHacks";
import { PersistGate } from "redux-persist/integration/react";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { FirebaseProvider } from "./context/useFirebase";
import Success from "./pages/Transaction/Success";
import Cancel from "./pages/Transaction/Cancel";
// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Layout />,
    children: [{ path: "adminDashboard", element: <AdminDashboard /> }],
  },
  {
    path: "/seller",
    element: <Layout />,
    children: [
      { path: "settings", element: <Setting /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <OrderList /> },
      { path: "products", element: <Products /> },
      { path: "analytics", element: <AppAnalytics /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/detail", element: <Detail /> },
      { path: "profile", element: <Profile /> },
      { path: "findjob", element: <Findjob /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "contact-us/form", element: <ContactForm /> },
      { path: "earnings", element: <Earnings /> },
      { path: "jobdetails/:jobId", element: <JobDetails /> },
      {
        path: "earnings/manage_payment_methods",
        element: <ManagePaymentMethods />,
      },
      { path: "chat", element: <Chat /> },
      { path: "publish-gig", element: <PublishGig /> },
      { path: "create-new-gig", element: <CreateNewGig /> },
      { path: "create-new-gig/2", element: <CreateNewGig2 /> },
      { path: "create-new-gig/3", element: <CreateNewGig3 /> },
      { path: "create-new-gig/4", element: <CreateNewGig4 /> },
      { path: "create-new-gig/5", element: <CreateNewGig5 /> },
      { path: "create-new-gig/6", element: <CreateNewGig6 /> },
      { path: "*", element: <Navigate to="/seller/dashboard" /> },
    ],
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      { path: "settings", element: <Setting /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <OrderList /> },
      { path: "products", element: <Products /> },
      { path: "analytics", element: <AppAnalytics /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/detail", element: <Detail /> },
      { path: "profile", element: <Profile /> },
      { path: "findjob", element: <Findjob /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "contact-us/form", element: <ContactForm /> },
      { path: "earnings", element: <Earnings /> },
      { path: "jobdetails/:jobId", element: <JobDetails /> },
      {
        path: "earnings/manage_payment_methods",
        element: <ManagePaymentMethods />,
      },
      { path: "chat", element: <Chat /> },
      { path: "publish-gig", element: <PublishGig /> },
      { path: "create-new-gig", element: <CreateNewGig /> },
      { path: "create-new-gig/2", element: <CreateNewGig2 /> },
      { path: "create-new-gig/3", element: <CreateNewGig3 /> },
      { path: "create-new-gig/4", element: <CreateNewGig4 /> },
      { path: "create-new-gig/5", element: <CreateNewGig5 /> },
      { path: "create-new-gig/6", element: <CreateNewGig6 /> },
      { path: "*", element: <Navigate to="/seller/dashboard" /> },
    ],
  },
  {
    path: "/",
    element: <Layout2 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile", element: <Profilepage /> },
      { path: "giglist", element: <Giglist /> },
      { path: "aboutseller/:gigId", element: <AboutSeller /> },
      { path: "orderdetail", element: <OrderDetails /> },
      { path: "submittedorder", element: <SubmittedOrder /> },
      { path: "payorder", element: <PayOrder /> },
      { path: "jobdetailstwo", element: <JobDetailstwo /> },
      { path: "postajob", element: <PostaJob /> },
      { path: "favourite", element: <FavouriteGigs /> },
      { path: "confirm-password", element: <ConfirmPassword /> },
      { path: "otp-verify", element: <Otp /> },
      { path: "blogs", element: <Blogs /> },
      { path: "guides", element: <Guides /> },
      { path: "productivityhacks", element: <ProductivityHacks /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseProvider>
          <QueryClientProvider client={queryClient}>
            {" "}
            <RouterProvider router={router} />
            <Toaster position="top-right" reverseOrder={false} />
          </QueryClientProvider>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
