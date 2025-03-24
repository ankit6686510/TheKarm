import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!input.email || !input.password || !input.role) {
            toast.error("All fields are required");
            return;
        }
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }
    
    useEffect(() => {
        if(user){
            navigate("/");
        }
    }, []);
    
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-100">
                <div className="w-full max-w-md px-4 py-8 mx-auto md:py-12">
                    <div className="overflow-hidden bg-white rounded-xl shadow-xl">
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col items-center mb-8 text-center">
                                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100">
                                    <LogIn className="w-6 h-6 text-purple-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                                <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
                            </div>
                            
                            <form onSubmit={submitHandler} className="space-y-5">
                                <div className="space-y-4">
                                    {/* Email Input */}
                                    <div>
                                        <Label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">
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
                                                className="pl-10 py-2 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Password Input */}
                                    <div>
                                        <Label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-700">
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
                                                className="pl-10 py-2 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
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
                                    </div>
                                    
                                    {/* Account Type Selection */}
                                    <div>
                                        <Label className="block mb-1.5 text-sm font-medium text-gray-700">
                                            Account Type
                                        </Label>
                                        <div className="grid grid-cols-2 gap-4 mt-1">
                                            <div className={`flex items-center p-3 border rounded-lg cursor-pointer ${input.role === "student" ? "bg-purple-50 border-purple-500" : "border-gray-200 hover:bg-gray-50"}`}>
                                                <Input
                                                    type="radio"
                                                    name="role"
                                                    value="student"
                                                    checked={input.role === 'student'}
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
                                                    checked={input.role === 'recruiter'}
                                                    onChange={changeEventHandler}
                                                    className="w-4 h-4 text-purple-600 cursor-pointer focus:ring-purple-500"
                                                    required
                                                />
                                                <Label htmlFor="recruiter" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                                                    Recruiter
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                {loading ? (
                                    <Button disabled className="w-full py-2.5 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 flex justify-center items-center">
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        <span>Signing in...</span>
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full py-2.5 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 flex justify-center items-center"
                                    >
                                        Sign In
                                    </Button>
                                )}
                                
                                {/* Signup Link */}
                                <div className="mt-4 text-center text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                                        Create one
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login