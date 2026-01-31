"use client";
import axios from "axios";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const router = useRouter();
	async function handleLogout() {
		await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
			method: "POST",
			withCredentials: true,
		});
		router.push("/login");
	}
	return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
