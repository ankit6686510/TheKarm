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
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";

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
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="flex justify-between">
              <span>Full Name</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Your Full Name"
              className={errors.fullname ? "border-red-500" : ""}
              required
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.fullname}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label className="flex justify-between">
              <span>E-mail</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter Your E-mail"
              className={errors.email ? "border-red-500" : ""}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label className="flex justify-between">
              <span>Phone Number</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter Your Phone Number"
              className={errors.phoneNumber ? "border-red-500" : ""}
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="my-2 relative">
            <Label className="flex justify-between">
              <span>Password</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
              className={errors.password ? "border-red-500" : ""}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.password}
              </p>
            )}
          </div>
          <div className="my-2 relative">
            <Label className="flex justify-between">
              <span>Confirm Password</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={changeEventHandler}
              placeholder="Confirm Your Password"
              className={errors.confirmPassword ? "border-red-500" : ""}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-8 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <Label className="flex mb-2">
                <span>Role</span>
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    required
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    required
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.role}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <Label className="flex mb-2">
                <span>Profile Image</span>
                <span className="text-red-500 ml-1 font-bold">*</span>
              </Label>
              <div className="flex flex-col">
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className={`cursor-pointer ${errors.file ? "border-red-500" : ""}`}
                  required
                />
                {input.file ? (
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    ✓ Image selected: {input.file.name}
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs mt-1">
                    Please upload your profile photo (required)
                  </p>
                )}
                {errors.file && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.file}
                  </p>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <Button disabled className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="w-full my-4"
              disabled={!isFormValid()}
            >
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
