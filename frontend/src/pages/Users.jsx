import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  UserPlus,
  Loader,
  Eye,
  Briefcase,
} from "lucide-react";
import { motion } from "motion/react";
import { useAdminStore } from "../store/useAdminStore";

const Users = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "reception",
  });

  const [togglePassword, setTogglePassword] = useState(false);
  const { register, isloading } = useAdminStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const success = await register(formData);
    if (success) navigate("/"); // redirect after successful registration
  };

  return (
    <div className="flex flex-col justify-center py-10 sm:px-6 lg:px-8 space-y-4 bg-white">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-600">
          Register
        </h2>
      </motion.div>

      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 
                             focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm px-3 py-2 pl-10"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 
                             focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm px-3 py-2 pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type={togglePassword ? "text" : "password"}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 
                             focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm px-3 py-2 pl-10"
                  placeholder="Enter your password"
                />
                <div className="absolute top-2 right-2 pl-3 flex items-center">
                  <button
                    className="hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setTogglePassword(!togglePassword);
                    }}
                  >
                    <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Role
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:ring-emerald-500 
                             focus:border-emerald-500 sm:text-sm px-3 py-2 pl-10"
                >
                  <option value="patient">Reception</option>
                  <option value="doctor">Doctor</option>
                  <option value="lab">lab</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium
                         text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-emerald-500 transition duration-300 ease-in-out disabled:opacity-50"
              disabled={isloading}
            >
              {isloading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="ml-2 h-5 w-5 pr-1" />
                  Register
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Users;
