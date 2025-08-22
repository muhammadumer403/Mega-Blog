import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './Index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const create = async (data) => {
        try {
            // Step 1: Create account
            await authService.createAccount(data);

            // Step 2: Fetch user data after account creation
            const userData = await authService.getCurrentUser();

            if (userData) {
                // Step 3: Dispatch login action
                dispatch(login(userData));
                navigate('/'); // Redirect to the home page after successful signup
            } else {
                throw new Error('User data could not be fetched.');
            }
        } catch (error) {
            setError(error.message || 'An error occurred during signup.');
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
            <div className="mx-auto w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-10 border border-gray-800">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">
                    Sign up to create an account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Name"
                            {...register('name', { required: 'Full name is required' })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid address',
                                },
                            })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required' })}
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
