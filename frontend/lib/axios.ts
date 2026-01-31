import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response?.status === 401) {
			await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/refresh`);
			return api(err.config);
		}
		return Promise.reject(err);
	},
);

export default api;
