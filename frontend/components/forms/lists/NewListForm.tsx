"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../Input";
import { Button } from "@/components/Button";
import { LoaderCircle } from "lucide-react";

export const ListSchema = z.object({
	title: z.string().trim(),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type List = z.infer<typeof ListSchema>;

const NewListForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<List>();
	const onSubmit: SubmitHandler<List> = async (data) => {
		await axios
			.post(`${API_URL}/api/list`, data, { withCredentials: true })
			.then((res) => {
				console.log(res);
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
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold">Create New List</h1>
				<span className="text-sm text-gray-400">
					Enter a title for your new list.
				</span>
			</div>

			<Input
				label="Title"
				{...register("title", { required: "Title of list required" })}
				error={errors.title?.message as string}
			/>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? (
					<div className="inline-flex items-center justify-center gap-2">
						<LoaderCircle className="size-4 animate-spin text-white" />
						<p>Creating list...</p>
					</div>
				) : (
					<span>Create List</span>
				)}
			</Button>

			{errors.root?.message && (
				<div className="bg-red-50 border border-red-200 p-3 text-sm text-red-500">
					{errors.root.message}
				</div>
			)}
		</form>
	);
};

export default NewListForm;
