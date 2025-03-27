import axios from "axios";
import { BASE_URL, BASE_URL_LOCAL } from "../utils/Config";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const apiForImage = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
apiForImage.interceptors.request.use(
  (config) => {
    // Dynamically set Authorization header
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const apiWithBearerToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});
apiWithBearerToken.interceptors.request.use(
  (config) => {
    // Dynamically set Authorization header
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// hdgfashgf

// Auth Requests
export const LoginApi = (payload) => api.post("/signIn", payload);
export const RegisterUserApi = (payload) => api.post("/signup", payload);
export const GetLoggedInUser = () => apiWithBearerToken.get("/signIn");
export const GetUserByID = (id) => apiWithBearerToken.get(`/signInbyid/${id}`);
export const updateProfile = (id, payload) => {
  return apiForImage.put(`/update-profile/${id}`, payload);
};

export const forgetPasswordStepOne = (payload) =>
  api.post("/forget-password/send-email", payload);
export const forgetPasswordStepTwo = (payload) =>
  api.post("/forget-password/verify-code", payload);
export const resetPassword = (payload) =>
  api.post("/forget-password/reset-password", payload);

export const logout = (id) => api.get(`/logout/${id}`);

export const UpdateStatusApi = (payload) =>
  api.patch("/appointment/status", payload);

export const VerifyAdminOtpApi = (payload) =>
  api.post("/auth/verify-otp", payload);

// post a job
export const postajob = async (payload) => {
  return await apiWithBearerToken.post("/postajob", payload);
};
export const getAllJobs = (filters) =>
  apiWithBearerToken.get("/getAllJobs", { params: filters });
export const getJobDetails = (id) =>
  apiWithBearerToken.get(`/getJobDetail/${id}`);

export const applyForJob = (jobId, payload) => {
  return apiWithBearerToken.post(`/apply/${jobId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

// Chat List
export const SendMessageAPI = (payload) =>
  api.post("/chat/send-message", payload);

// products API
export const AddNewProductApi = (payload) =>
  api.post("/products/create", payload);
export const GetAllProductApi = () => api.get("/products/all");
export const UpdateProductApi = (id, payload) =>
  api.patch("/products/" + id, payload);
export const DeleteProductApi = (id) => api.delete("/products/" + id);

// products orders API
export const CreateProductOrderApi = (payload) =>
  api.post("/products-order/create", payload);
export const GetAllProductOrderApi = () => api.get("/products-order/all");
export const UpdateProductOrderApi = (id, payload) =>
  api.patch("/products-order/" + id, payload);
// blogs API
export const AddNewBlogApi = (payload) => api.post("/blogs/create", payload);
export const GetAllBlogApi = () => api.get("/blogs/all");
export const GetBlogByIdApi = (id) => api.get("/blogs/" + id);
export const DeleteBlogApi = (id) => api.delete("/blogs/" + id);
export const UpdateBlogApi = (id, payload) =>
  api.patch("/blogs/" + id, payload);

// services API
export const AddNewServiceApiStep1 = (payload) =>
  apiWithBearerToken.post("/create-service/step-one", payload);

export const AddNewServiceApiStep2 = (payload, id) =>
  apiWithBearerToken.post(`/create-service/step-two/${id}`, payload);
export const AddNewServiceApiStep3 = (payload, id) =>
  apiWithBearerToken.post(`/create-service/step-three/${id}`, payload);
export const AddNewServiceApiStep4 = (payload, id) =>
  apiForImage.post(`/create-service/step-four/${id}`, payload);
export const DeleteServiceApi = (id) =>
  apiWithBearerToken.delete("/delete-service/" + id);
export const GetCurrentUserServicesApi = () =>
  apiWithBearerToken.get("/get-current-user-services-data");
export const GetFavouriteGigs = () =>
  apiWithBearerToken.get("/guest/get-favourite-gigs");
export const AddToFavourite = (payload) =>
  apiWithBearerToken.post("/guest/add-to-favourite", payload);
export const RemoveFromFavourite = (payload) =>
  apiWithBearerToken.post("/guest/remove-from-favourite", payload);

export const GetAllServiceApi = () => api.get("/get-services-data");
export const GetSingleServiceApi = (id) =>
  api.get(`/get-service-details/${id}`);
export const UpdateServiceApi = (id, payload) =>
  api.patch("/services/" + id, payload);

// Appoitment
export const AddNewAppoitmentApi = (payload) =>
  api.post("/products-order/place-order", payload);
// Category

export const getCategories = () => api.get("/get-categories");
export const getSubCategories = (categoryId) =>
  api.get(`/get-subcategories/${categoryId}`);
//pay order
export const payNow = async (payload, method) => {
  return await apiWithBearerToken.post(`/pay/${method}`, payload);
};

export const transactionSuccess = async (payload) => {
  return await apiWithBearerToken.post(`/transaction-success`, payload);
};

export const transactionCancelled = async (payload) => {
  return await apiWithBearerToken.post(`/transaction-cancel`, payload);
};
//fetch Wallet
export const fetchWallet = async () => {
  return await apiWithBearerToken.get(`/wallet`);
};

//stripe connect
export const stripeConnect = async (payload) => {
  return await apiWithBearerToken.post(`/stripe/connect`, payload);
};

//paypal connect
export const paypalConnect = async (payload) => {
  return await apiWithBearerToken.post(`/paypal/connect`, payload);
};

//withdraw money via paypal
export const withdrawViaPaypal = async () => {
  return await apiWithBearerToken.post(`/withdraw/paypal`);
};

export const acceptOrder = async (oderId) => {
  return await apiWithBearerToken.patch(`/${oderId}/accept`);
};

export const withdrawViaStripe = async () => {
  console.log("here");
  return await apiWithBearerToken.post(`/withdraw/stripe`);
};

//get profile data
export const getProfileData = (id) =>
  api.get(`/get-profile`, { params: { userid: id } });
//delete profile data
export const deleteAccount = (id) => api.post(`/delete-profile/${id}`);
