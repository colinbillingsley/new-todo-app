"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Button } from "../../Button";
import Link from "next/link";
import { ArrowUpRightFromSquare, LoaderCircle } from "lucide-react";
import "dotenv/config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { redirect } from "next/navigation";

export const UserSignInSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	username: z.string().trim(),
	password: z.string().trim(),
});

export type User = z.infer<typeof UserSignInSchema>;

function SignupForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<User>();
	const onSubmit: SubmitHandler<User> = async (data) => {
		await axios
			.post(
				`${process.env.BASE_URL ?? "http://localhost:4000"}/api/user/register`,
				{
					...data,
					id: uuidv4(),
				},
			)
			.then((res) => {
				console.log(res);
				redirect("/login");
			})
			.catch((error) => {
				console.log(error);
				const message =
					error.response?.data?.message ?? "Something went wrong.";

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
				<h1 className="text-3xl font-bold">Create an account!</h1>
				<span className="text-sm text-gray-400">
					Fill in all the fields to create an account, so you can begin creating
					your todo lists!
				</span>
			</div>

			<Input
				label="Full Name"
				{...register("name", { required: "Full Name is required" })}
				error={errors.name?.message as string}
			/>
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
						<p>Creating Account...</p>
					</div>
				) : (
					<span>Create Account</span>
				)}
			</Button>

			{errors.root?.message && (
				<div className="bg-red-50 border border-red-200 p-3 text-sm text-red-500">
					{errors.root.message}
				</div>
			)}

			<div className="flex items-center gap-4 mt-8">
				<p className="text-sm">Already have an account?</p>
				<Link
					href={"/login"}
					className="inline-flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm tracking-wider underline hover:underline-offset-2 transition-all"
				>
					<p>Login here</p>
					<ArrowUpRightFromSquare className="size-4" strokeWidth={3} />
				</Link>
			</div>
		</form>
	);
}

export default SignupForm;
