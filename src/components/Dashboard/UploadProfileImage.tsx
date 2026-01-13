"use client";

import config from "@/config";
import { uploadImageToCloudinary } from "@/lib/utils";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function UploadProfileImage({ user }: any) {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const router = useRouter();
  const token = useAppSelector(selectCurrentToken);
  const [updateProfile, { isLoading: loading, isSuccess }] =
    useUpdateProfileMutation();
  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("this is token from image upload", token);
    try {
      const profileImage = await uploadImageToCloudinary(file);
      const userInfo = {
        id: user._id,
        userData: { avatar: profileImage },
        token,
      };

      const res = await updateProfile(userInfo).unwrap();
      console.log(res);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };
  return (
    <>
      <button onClick={() => setShowProfileOptions(!showProfileOptions)}>
        <Camera size={20} />
      </button>
      {showProfileOptions && (
        <div className="absolute w-40 top-full right-0 bg-white dark:bg-dark  shadow-lg rounded p-2 flex items-center flex-col gap-2">
          <button
            className="text-sm dark:hover:bg-gray-7 w-full hover:bg-gray-3 py-1 rounded"
            onClick={() => setShowPreview(true)}
          >
            View Profile Pic
          </button>
          <label className="cursor-pointer text-sm dark:hover:bg-gray-7 w-full hover:bg-gray-3 py-1 rounded text-center">
            Change Profile Pic
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfileChange}
            />
          </label>
        </div>
      )}
      {showPreview && (
        <div
          onClick={() => {
            setShowPreview(false);
            setShowProfileOptions(false);
          }}
          className="fixed inset-0 bg-dark/50 flex justify-center items-center z-50 w-full"
        >
          <div className="bg-white dark:bg-dark-2 p-4 rounded-md shadow-lg relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setShowPreview(false)}
            >
              <X className="text-dark" />
            </button>
            <Image
              src={user?.avatar || "/demo_male.png"}
              width={400}
              height={400}
              alt="profile preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
