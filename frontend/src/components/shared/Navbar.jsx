import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log(user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/"); // redirect to home page
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error); // log the error
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <style jsx>{`
        .nav-link {
          position: relative;
          display: inline-block;
          color: inherit;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0.25rem;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #6a38c2;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
        }

        .nav-link:hover {
          color: #6a38c2; /* Change text color on hover */
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .logo {
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .logo:hover {
          transform: scale(1.05);
        }
      `}</style>
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
        <div>
          <Link to="/" className="logo">
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="text-[#12343b]">Kar</span>
              <span className="text-[#FFEA00]">m.</span>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-10 w-10"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link className="nav-link" to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/browse">Browse</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/services">Services</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="font-medium transition-colors hover:text-[#6A38C2]">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#38225d] font-medium transition-all duration-300 transform hover:scale-105">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-transparent hover:border-[#6A38C2] transition-all duration-300">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                  <AvatarFallback className="bg-[#f0f0f0]">
                    <User2 className="h-4 w-4 text-gray-600" />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-lg rounded-lg border border-gray-200">
                <div className="">
                  <div className="flex gap-3 items-center mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                      />
                      <AvatarFallback className="bg-[#f0f0f0]">
                        <User2 className="h-5 w-5 text-gray-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-lg">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {user?.profile?.bio || "No bio added yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-700 space-y-2">
                    {user && user.role === "student" && (
                      <div className="flex w-full items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <User2 className="h-5 w-5" />
                        <Button variant="link" className="p-0 h-auto font-medium">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-full items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                      <LogOut className="h-5 w-5" />
                      <Button onClick={logoutHandler} variant="link" className="p-0 h-auto font-medium">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-4">
            <ul className="flex flex-col font-medium space-y-3">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link className="nav-link block" to="/admin/companies" onClick={() => setIsMobileMenuOpen(false)}>Companies</Link>
                  </li>
                  <li>
                    <Link className="nav-link block" to="/admin/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="nav-link block" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                  </li>
                  <li>
                    <Link className="nav-link block" to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link>
                  </li>
                  <li>
                    <Link className="nav-link block" to="/browse" onClick={() => setIsMobileMenuOpen(false)}>Browse</Link>
                  </li>
                  <li>
                    <Link className="nav-link block" to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-medium transition-colors hover:text-[#6A38C2]">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#38225d] font-medium transition-all duration-300">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback className="bg-[#f0f0f0]">
                      <User2 className="h-5 w-5 text-gray-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "No bio added yet"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {user && user.role === "student" && (
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User2 className="mr-2 h-5 w-5" />
                        View Profile
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => {
                    logoutHandler();
                    setIsMobileMenuOpen(false);
                  }}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;






// import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { LogOut, User2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/"); // redirect to home page
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error); // log the error
//       toast.error(error.response.data.message);
//     }
//   };
//   return (
//     <div className="bg-white">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           <h1 className="text-4xl font-bold">
//             <span className="text-[#7A1CAC]">Kar</span>
//             <span className="text-[#edd737]">m.</span>
//           </h1>
//         </div>
//         <div className="flex items-center gap-12">
//           <ul className="flex font-medium items-center gap-5">
//             {user && user.role === "recruiter" ? (
//               <>
//                 <li>
//                   <Link to="/admin/companies">Companies</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/jobs">Jobs</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/jobs">Jobs</Link>
//                 </li>
//                 <li>
//                   <Link to="/browse">Browse</Link>
//                 </li>
//                 <li>
//                   <Link to="/services">services</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {!user ? (
//             <div className="flex items-center gap-3">
//               <Link to="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-[#6A38C2] hover:bg-[#38225d]">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto}
//                     alt="@shadcn"
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="">
//                   <div className="flex gap-2 space-y-2">
//                     <Avatar className="cursor-pointer">
//                       <AvatarImage
//                         src={user?.profile?.profilePhoto}
//                         alt="@shadcn"
//                       />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">
//                         {user?.profile?.bio}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col my-2 text-gray-600">
//                     {user && user.role === "student" && (
//                       <div className="flex w-fit items-center gap-2 cursor-pointer">
//                         <User2 />
//                         <Button variant="link">
//                           {" "}
//                           <Link to="/profile">View Profile</Link>
//                         </Button>
//                       </div>
//                     )}

//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       <LogOut />
//                       <Button onClick={logoutHandler} variant="link">
//                         Logout
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
