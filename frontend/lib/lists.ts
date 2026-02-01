import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUserLists() {
	const res = await axios.get(`${BASE_URL}/api/list/`, {
		withCredentials: true,
	});
	console.log(res);
	return Array.isArray(res.data.lists) ? res.data.lists : [];
}
