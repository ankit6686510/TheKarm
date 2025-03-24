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
        <div className="w-full max-w-2xl px-4 py-8 mx-auto md:py-12">
          <div className="overflow-hidden bg-white rounded-xl shadow-xl">
            <div className="md:flex">
              {/* Left Side - Form */}
              <div className="p-6 sm:p-8 md:w-full">
                <div className="flex flex-col items-center mb-8 text-center">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100">
                    <UserCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
                  <p className="mt-2 text-sm text-gray-500">Enter your information to get started</p>
                </div>
                
                <form onSubmit={submitHandler} className="space-y-5">
                  <div className="space-y-4">
                    {/* Full Name Input */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Full Name</span>
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                          type="text"
                          value={input.fullname}
                          name="fullname"
                          onChange={changeEventHandler}
                          placeholder="John Doe"
                          className={`pl-10 py-2 ${errors.fullname ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"}`}
                          required
                        />
                      </div>
                      {errors.fullname && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.fullname}
                        </p>
                      )}
                    </div>
                    
                    {/* Email Input */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Email Address</span>
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                          type="email"
                          value={input.email}
                          name="email"
                          onChange={changeEventHandler}
                          placeholder="you@example.com"
                          className={`pl-10 py-2 ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"}`}
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    
                    {/* Phone Number Input */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Phone Number</span>
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                          type="text"
                          value={input.phoneNumber}
                          name="phoneNumber"
                          onChange={changeEventHandler}
                          placeholder="1234567890"
                          className={`pl-10 py-2 ${errors.phoneNumber ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"}`}
                          required
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                    
                    {/* Password Input */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Password</span>
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={input.password}
                          name="password"
                          onChange={changeEventHandler}
                          placeholder="••••••••"
                          className={`pl-10 py-2 ${errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>
                    
                    {/* Confirm Password Input */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Confirm Password</span>
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={input.confirmPassword}
                          name="confirmPassword"
                          onChange={changeEventHandler}
                          placeholder="••••••••"
                          className={`pl-10 py-2 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showConfirmPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    
                    {/* Role Selection */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Account Type</span>
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div className={`flex items-center p-3 border rounded-lg cursor-pointer ${input.role === "student" ? "bg-purple-50 border-purple-500" : "border-gray-200 hover:bg-gray-50"}`}>
                          <Input
                            type="radio"
                            name="role"
                            value="student"
                            checked={input.role === "student"}
                            onChange={changeEventHandler}
                            className="w-4 h-4 text-purple-600 cursor-pointer focus:ring-purple-500"
                            required
                          />
                          <Label htmlFor="student" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                            Student
                          </Label>
                        </div>
                        <div className={`flex items-center p-3 border rounded-lg cursor-pointer ${input.role === "recruiter" ? "bg-purple-50 border-purple-500" : "border-gray-200 hover:bg-gray-50"}`}>
                          <Input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role === "recruiter"}
                            onChange={changeEventHandler}
                            className="w-4 h-4 text-purple-600 cursor-pointer focus:ring-purple-500"
                            required
                          />
                          <Label htmlFor="recruiter" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                            Recruiter
                          </Label>
                        </div>
                      </div>
                      {errors.role && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.role}
                        </p>
                      )}
                    </div>
                    
                    {/* Profile Image Upload */}
                    <div>
                      <Label className="flex mb-1.5 text-sm font-medium text-gray-700">
                        <span>Profile Image</span>
                        <span className="text-red-500 ml-1 font-bold">*</span>
                      </Label>
                      <div className="mt-1">
                        <div className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${errors.file ? "border-red-300 bg-red-50" : input.file ? "border-green-300 bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}>
                          <div className="space-y-1 text-center">
                            <div className="flex justify-center">
                              {input.file ? (
                                <div className="relative w-20 h-20">
                                  <img 
                                    src={URL.createObjectURL(input.file)} 
                                    alt="Profile preview" 
                                    className="object-cover w-20 h-20 rounded-full"
                                  />
                                </div>
                              ) : (
                                <FileImage className="w-12 h-12 mx-auto text-gray-400" />
                              )}
                            </div>
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative font-medium text-purple-600 bg-white rounded-md cursor-pointer hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                                <span>{input.file ? "Change photo" : "Upload a photo"}</span>
                                <Input
                                  id="file-upload"
                                  accept="image/*"
                                  type="file"
                                  onChange={changeFileHandler}
                                  className="sr-only"
                                  required
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                        {input.file && (
                          <p className="mt-2 text-xs text-green-600 flex items-center">
                            ✓ {input.file.name}
                          </p>
                        )}
                        {errors.file && (
                          <p className="mt-1 text-xs text-red-500 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.file}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    {loading ? (
                      <Button disabled className="w-full py-2.5 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 flex justify-center items-center">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 
                        <span>Creating account...</span>
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className={`w-full py-2.5 text-white rounded-lg shadow-sm flex justify-center items-center transition-colors ${isFormValid() ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-300 cursor-not-allowed'}`}
                        disabled={!isFormValid()}
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                  
                  {/* Login Link */}
                  <div className="mt-4 text-center text-sm text-gray-600">
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
    </div>
  );
};

export default Signup;
