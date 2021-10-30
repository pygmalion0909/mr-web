import axios from "axios";
import { setInterceptors } from "@/api/user/interceptors";

const instance = axios.create({
	baseURL: "/api/v1/users",
});

const axiosApi = setInterceptors(instance);

export default axiosApi;
