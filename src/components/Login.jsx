import React, { useState } from "react";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./Index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../index.css"
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); // Clear any previous error
    console.log("Login data:", data);

    try {
      // Step 1: Log in the user
      const session = await authService.login(data);
      if (!session) {
        throw new Error("Login failed: No session created.");
      }

      // Step 2: Fetch the current user data
      const userData = await authService.getCurrentUser();
      console.log('lime 28', userData)
      if (!userData) {
        throw new Error("Failed to retrieve user data.");
      }

      // Step 3: Dispatch login action and navigate
      dispatch(authLogin(userData.email, userData.password));
      navigate("/"); // Redirect to home or dashboard
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An unknown error occurred during login.");
    }
  };

  return (
    <div className="flex items-center font- justify-center w-full min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-lg bg-zinc-800 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              className="bg-gray-700 text-white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

            <Input
              label="Password"
              placeholder="Password"
              type="password"
              className="bg-gray-700 text-white"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
