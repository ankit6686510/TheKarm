import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff, AlertCircle, User, Mail, Phone, Lock, FileImage, UserCircle } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: null,
  });
  
  // Form validation state
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      input.fullname.trim() !== "" &&
      input.email.trim() !== "" &&
      input.phoneNumber.trim() !== "" &&
      input.password.trim() !== "" &&
      input.confirmPassword.trim() !== "" &&
      input.role !== "" &&
      input.file !== null &&
      Object.values(errors).every(error => error === "")
    );
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
      case "fullname":
        errorMessage = value.trim() === "" ? "Full name is required" : "";
        break;
      case "email":
        if (value.trim() === "") {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Please enter a valid email";
        }
        break;
      case "phoneNumber":
        if (value.trim() === "") {
          errorMessage = "Phone number is required";
        } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
          errorMessage = "Please enter a valid 10-digit phone number";
        }
        break;
      case "password":
        if (value.trim() === "") {
          errorMessage = "Password is required";
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters";
        }
        
        // Check if confirm password needs to be validated
        if (input.confirmPassword && value !== input.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: "Passwords do not match"
          }));
        } else if (input.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: ""
          }));
        }
        break;
      case "confirmPassword":
        if (value.trim() === "") {
          errorMessage = "Please confirm your password";
        } else if (value !== input.password) {
          errorMessage = "Passwords do not match";
        }
        break;
      case "role":
        errorMessage = value === "" ? "Please select a role" : "";
        break;
      case "file":
        errorMessage = !value ? "Please upload a profile image" : "";
        break;
      default:
        break;
    }
    
    return errorMessage;
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    
    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file: file });
    setErrors({ 
      ...errors, 
      file: file ? "" : "Please upload a profile image" 
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Check specifically for file upload
    if (!input.file) {
      setErrors({
        ...errors,
        file: "Please upload a profile image"
      });
      toast.error("Profile image is required");
      return;
    }
    
    // Validate all fields before submission
    const newErrors = {
      fullname: validateField("fullname", input.fullname),
      email: validateField("email", input.email),
      phoneNumber: validateField("phoneNumber", input.phoneNumber),
      password: validateField("password", input.password),
      confirmPassword: validateField("confirmPassword", input.confirmPassword),
      role: validateField("role", input.role),
      file: validateField("file", input.file),
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      toast.error("Please fix all errors before submitting");
      return;
    }
    
    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-100">
        <div className="w-full max-w-md px-4 py-8 mx-auto md:py-12">
          <div className="overflow-hidden bg-white rounded-xl shadow-xl">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 rounded-full bg-purple-100">
                  <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create an Account</h1>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Join our community today</p>
              </div>
              
              <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
                <div className="space-y-3 sm:space-y-4">
                  {/* Full Name Input */}
                  <div>
                    <Label htmlFor="fullname" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input
                        id="fullname"
                        type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                        placeholder="John Doe"
                        className="pl-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {errors.fullname && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.fullname && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullname}</p>
                    )}
                  </div>
                  
                  {/* Email Input */}
                  <div>
                    <Label htmlFor="email" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="you@example.com"
                        className="pl-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {errors.email && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone Number Input */}
                  <div>
                    <Label htmlFor="phoneNumber" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        placeholder="1234567890"
                        className="pl-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {errors.phoneNumber && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                  
                  {/* Password Input */}
                  <div>
                    <Label htmlFor="password" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="••••••••"
                        className="pl-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                  
                  {/* Confirm Password Input */}
                  <div>
                    <Label htmlFor="confirmPassword" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={changeEventHandler}
                        placeholder="••••••••"
                        className="pl-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  {/* Profile Image Upload */}
                  <div>
                    <Label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Profile Image
                    </Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file"
                        className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileImage className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-xs sm:text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                        </div>
                        <input
                          id="file"
                          type="file"
                          name="file"
                          accept="image/*"
                          onChange={changeFileHandler}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {errors.file && (
                      <p className="mt-1 text-xs text-red-500">{errors.file}</p>
                    )}
                  </div>
                  
                  {/* Account Type Selection */}
                  <div>
                    <Label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                      Account Type
                    </Label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-1">
                      <div className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer ${input.role === "student" ? "bg-purple-50 border-purple-500" : "border-gray-200 hover:bg-gray-50"}`}>
                        <Input
                          type="radio"
                          name="role"
                          value="student"
                          checked={input.role === 'student'}
                          onChange={changeEventHandler}
                          className="w-4 h-4 text-purple-600 cursor-pointer focus:ring-purple-500"
                          required
                        />
                        <Label htmlFor="student" className="ml-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
                          Student
                        </Label>
                      </div>
                      <div className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer ${input.role === "recruiter" ? "bg-purple-50 border-purple-500" : "border-gray-200 hover:bg-gray-50"}`}>
                        <Input
                          type="radio"
                          name="role"
                          value="recruiter"
                          checked={input.role === 'recruiter'}
                          onChange={changeEventHandler}
                          className="w-4 h-4 text-purple-600 cursor-pointer focus:ring-purple-500"
                          required
                        />
                        <Label htmlFor="recruiter" className="ml-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
                          Recruiter
                        </Label>
                      </div>
                    </div>
                    {errors.role && (
                      <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                {loading ? (
                  <Button disabled className="w-full py-2 sm:py-2.5 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 flex justify-center items-center">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    <span className="text-xs sm:text-sm">Creating account...</span>
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full py-2 sm:py-2.5 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 flex justify-center items-center"
                  >
                    <span className="text-xs sm:text-sm">Create Account</span>
                  </Button>
                )}
                
                {/* Login Link */}
                <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
