import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useForm } from "react-hook-form"

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
      } = useForm()

      const onSubmit = (data) => console.log(data)
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center text-[#232323]">Createx</h1>
        <p className="text-center text-sm text-gray-500 mt-1">EG</p>
        <p className="text-center text-green-500 text-sm mb-4">Your data is protected</p>

        <div className="bg-red-100 text-red-700 p-3 text-sm rounded mb-6 text-center">
          Get your first 20% discount on your first order
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 text-[#232323]">
        
        {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-[#232323]"
            />
          </div>

        {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            {...register("password", { required: true })}
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
          </div>

        {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remind me
            </label>
            <a href="#" className="text-gray-600 hover:underline">Forget your password?</a>
          </div>

        {/*Login button */}
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900">
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account? <a href="#" className="text-black font-medium hover:underline">Sign up</a>
          </p>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
