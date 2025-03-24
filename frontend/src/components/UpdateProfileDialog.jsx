import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, ImageIcon, FileIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill).join(",") || "",
    resumeFile: null,
    profilePhotoFile: null,
  });
  
  // Track the file names separately for display
  const [resumeFileName, setResumeFileName] = useState(user?.profile?.resumeOriginalName || "");
  const [profileFileName, setProfileFileName] = useState("");
  
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const resumeFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, resumeFile: file });
      setResumeFileName(file.name);
    }
  };
  
  const profilePhotoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhotoFile: file });
      setProfileFileName(file.name);
      
      // Show preview of the uploaded image
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewElement = document.getElementById('profile-preview');
        if (previewElement) {
          previewElement.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // Preventing page from refreshing
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    
    if (input.resumeFile) {
      formData.append("resumeFile", input.resumeFile);
    }
    
    if (input.profilePhotoFile) {
      formData.append("profilePhotoFile", input.profilePhotoFile);
    }
    
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profilePhotoFile" className="text-right">
                  Profile Photo
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-4 mb-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage 
                        id="profile-preview"
                        src={user?.profile?.profilePhoto} 
                        alt={user?.fullname || "Profile"} 
                      />
                      <AvatarFallback className="bg-gray-200">
                        <ImageIcon className="h-8 w-8 text-gray-500" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Input
                        id="profilePhotoFile"
                        name="profilePhotoFile"
                        type="file"
                        accept="image/*"
                        onChange={profilePhotoChangeHandler}
                        className="w-full"
                      />
                      {profileFileName && (
                        <p className="text-xs text-gray-500 mt-1">
                          Selected: {profileFileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                  placeholder="React, Node, Express, MongoDB"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resumeFile" className="text-right">
                  Resume
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-5 w-5 text-gray-500" />
                    <Input
                      id="resumeFile"
                      name="resumeFile"
                      type="file"
                      accept="application/pdf"
                      onChange={resumeFileChangeHandler}
                      className="w-full"
                    />
                  </div>
                  {resumeFileName && (
                    <p className="text-xs text-gray-500 mt-1">
                      Current file: {resumeFileName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button disabled className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
