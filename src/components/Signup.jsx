import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStore, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState({ message: '', isError: false });

  const onSubmit = async (data, e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg || 'An error occurred during registration.');
      }

      setSubmissionStatus({ message: 'Registration successful! Redirecting...', isError: false });

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      setSubmissionStatus({ message: error.message, isError: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#232323]">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-center text-2xl font-bold">Create a new account</h2>
        <div className="flex justify-center text-3xl text-black">
          <FaStore />
        </div>
        <h3 className="text-center text-lg font-semibold">Create your online store</h3>
        <p className="text-center text-sm text-gray-500">Enter your data to create a new account</p>

        {submissionStatus.message && (
          <p className={`text-center text-sm ${submissionStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
            {submissionStatus.message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Store Name Input */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaStore className="text-gray-400 mr-2" />
            <input
              {...register('storeName', { required: 'Store name is required' })}
              placeholder="Enter your store name"
              className="w-full outline-none"
            />
          </div>
          {errors.storeName && <p className="text-sm text-red-500">{errors.storeName.message}</p>}

          {/* Email Input */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none"
            />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

          {/* Phone Input */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              {...register('phone', { required: 'Phone number is required' })}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full outline-none"
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

          {/* Password Input */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none"
            />
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              {...register('terms', { required: 'You must agree to the terms' })}
            />
            <label>I agree to the Terms of Use and Privacy Policy</label>
          </div>
          {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Create an account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-black font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
