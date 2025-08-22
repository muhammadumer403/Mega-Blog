import React, { useId } from 'react';

// Forward ref to allow passing ref from parent component
const Select = React.forwardRef(({ options, label, className, ...props }, ref) => {
    const id = useId(); // Generates a unique ID for the select element

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref} // Forwarding the ref
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
