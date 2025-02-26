import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import { cloudinary } from "../utils/cloudinary.js";

export const signUp = async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    if (!email || !password || !fullname) {
      return res
        .status(400)
        .json({ success: false, message: "All fields is required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be greater than 6 char.",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate the JWT
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        password: null,
      });
    } else {
      res.status(400).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log("Error In SignUp Controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email & Password Required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const decodePass = await bcrypt.compare(password, user.password);

    if (!decodePass) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    await generateToken(user._id, res);
    res
      .status(200)
      .json({ id: user._id, fullname: user.fullname, email: user.email });
  } catch (error) {
    console.log("Error while logIn", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "User Logged out successfully" });
  } catch (error) {
    console.log("Error while logging Out", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;
    if (!profilepic) {
      return res
        .status(400)
        .json({ success: false, message: "Profile Pic is Required" });
    }

    const uploadData = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadData.secure_url },
      { new: true }
    );

    return res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.log("Error in Updating Profile:- ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const checkUser = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error while checkingUser:- ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
