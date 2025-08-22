import React, { useId, forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', className = '', ...props }, ref) => {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 border border-gray-300 w-full ${className} transition-all duration-300`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    );
});

export default Input;
