import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Mail, UserRound } from "lucide-react";
import {NavLink} from 'react-router-dom'

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  //* This function is used to select and show the file in the img section
  const handleProfileUplaod = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="main_container profile">
      <div className="profile_container">
        <div className="upper_profile_div">
          <div className="image_div">
            <img src={selectedImg || authUser.profilepic} alt="profile" />
          </div>
          <div>
            <input
              type="file"
              disabled={isUpdatingProfile}
              onChange={handleProfileUplaod}
              accept="image/*"
            />
          </div>
          <p>
            {isUpdatingProfile
              ? "Uploading"
              : "Please use less tha 10mb file size"}
          </p>
        </div>
        <div className="lower_profile_div">
          <div className="pofile_info">
            <div className="fullname_sec">
              <UserRound style={{ marginRight: "1vh" }} />
              Full Name
            </div>
            <p>{authUser?.fullname}</p>

            <div className="fullname_sec">
              <Mail style={{ marginRight: "1vh" }} />
              E-mail
            </div>
            <p>{authUser?.email}</p>
            <NavLink to='/' className='profile_go_back'>
              Go Back
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
