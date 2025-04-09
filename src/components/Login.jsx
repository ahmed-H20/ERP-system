import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg || 'حدث خطأ أثناء تسجيل الدخول.');
      }

      setSuccessMessage('تم تسجيل الدخول بنجاح ✅');
      
    
      console.log('Login Successful:', responseData);

      setTimeout(() => {
        window.location.reload();
      }, 1500); // Refresh the page 

    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center text-[#232323]">Createx</h1>
        <p className="text-center text-sm text-gray-500 mt-1">EG</p>
        <p className="text-center text-green-500 text-sm mb-4">Your data is protected</p>

        {serverError && (
          <div className="bg-red-100 text-red-700 p-3 text-sm rounded mb-6 text-center">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 text-sm rounded mb-6 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 text-[#232323]">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-[#232323]"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register('password', { required: 'كلمة المرور مطلوبة' })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-[#232323]"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Remind me
              </label>
              <a href="#" className="text-gray-600 hover:underline">Forget your password?</a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account? <Link to="/signup" className="text-black font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

