"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { User } from "@/app/(public)/(auth)/signup/page";
import { Button } from "../Button";
import Link from "next/link";
import { ArrowUpRightFromSquare } from "lucide-react";
import "dotenv/config";
import axios from "axios";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = (data) => {
    const res = axios
      .post(
        `${process.env.BASE_URL ?? "http://localhost:4000"}/api/user/register`,
        {
          data,
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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

      <Button type="submit">Create account</Button>

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
