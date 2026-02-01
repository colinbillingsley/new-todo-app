"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Button } from "../../Button";
import Link from "next/link";
import { ArrowUpRightFromSquare, LoaderCircle } from "lucide-react";
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const UserLoginSchema = z.object({
	username: z.string().trim(),
	password: z.string().trim(),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type User = z.infer<typeof UserLoginSchema>;

function LoginForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<User>();
	const onSubmit: SubmitHandler<User> = async (data) => {
		await axios
			.post(`${API_URL}/api/user/login`, data, { withCredentials: true })
			.then((res) => {
				console.log(res);
				router.push("/dashboard");
			})
			.catch((error) => {
				const message =
					error.response?.data?.message ||
					error.response?.data?.error ||
					error.response?.data ||
					"Something went wrong.";

				setError("root", {
					type: "server",
					message,
				});
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 bg-white mx-auto min-h-screen w-2xl p-6"
		>
			<div>
				<h1 className="text-3xl font-bold">Log In</h1>
				<span className="text-sm text-gray-400">
					Enter your credentials to log in and start organizing your tasks!
				</span>
			</div>

			<Input
				label="Username"
				{...register("username", { required: "Username required" })}
				error={errors.username?.message as string}
			/>
			<Input
				label="Password"
				type="password"
				{...register("password", { required: "Password required" })}
				error={errors.password?.message as string}
			/>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? (
					<div className="inline-flex items-center justify-center gap-2">
						<LoaderCircle className="size-4 animate-spin text-white" />
						<p>Logging in...</p>
					</div>
				) : (
					<span>Login</span>
				)}
			</Button>

			{errors.root?.message && (
				<div className="bg-red-50 border border-red-200 p-3 text-sm text-red-500">
					{errors.root.message}
				</div>
			)}

			<div className="flex items-center gap-4 mt-8">
				<p className="text-sm">Don&apos;t have an account?</p>
				<Link
					href={"/signup"}
					className="inline-flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm tracking-wider underline hover:underline-offset-2 transition-all"
				>
					<p>Create an account here</p>
					<ArrowUpRightFromSquare className="size-4" strokeWidth={3} />
				</Link>
			</div>
		</form>
	);
}

export default LoginForm;
