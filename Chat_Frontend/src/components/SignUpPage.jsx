import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye, EyeOff, KeyRound, Mail, UserRound } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  // For Hide and show the password..
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPass = () => {
    setShowPassword(!showPassword);
  };

  // For Handling the SignUp Form..
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: ""
  })

  const { isSigningUp, signup } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullname.trim()) return toast.error("Full name is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!formData.password.trim()) return toast.error("Password is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Please check the email")
    if(formData.password.length < 6) return toast.error("Password should be grater than 6 character")

    return true;

  };

  const handleSignUpForm = (e) => {
    e.preventDefault();

    const passedValidation = validateForm()
    if (passedValidation == true) signup(formData)
  };



  return (
    <div className="main_container login">
      <div className="login_container">
        <div className="upper_div">
          <h2>Welcome To Chatter</h2>
          <p>Create Your Account</p>
        </div>
        <form onSubmit={handleSignUpForm} className="login_form">
          <label htmlFor="Fullname">FullName</label>
          <div className="inpu_div">
            <UserRound width={"20px"} />
            <input
              type="text"
              placeholder="masoom"
              name="fullname"
              id="Fullname"
              value={formData.fullname}
              onChange={(e) => setFormData({...formData, fullname: e.target.value}) }
            />
          </div>

          <label htmlFor="Email">Email</label>
          <div className="inpu_div">
            <Mail width={"20px"} />
            <input
              type="email"
              placeholder="xyz@example.com"
              name="email"
              id="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value}) }
            />
          </div>

          <label htmlFor="Password">Password</label>

          <div className="inpu_div">
            <KeyRound width={"20px"} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              name="password"
              id="Password"
              className="pass"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value}) }
            />
          {showPassword ? (
            <EyeOff width={"20px"} onClick={toggleShowPass} className="eye_Icon" />
          ) : (
            <Eye width={"20px"} onClick={toggleShowPass} className="eye_Icon" />
          )}
          </div>
          <button type="submit" disabled={isSigningUp}>
            {isSigningUp ? 'Loading...' : 'Create Account'}
          </button>
          <p>
            Already have an account
            <NavLink to="/login"> Log In</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
