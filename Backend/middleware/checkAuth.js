import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const checkAuth = async (req, res, next) => {
  try {
    const findToken = req.cookies.token;
    if (!findToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decodeToken = jwt.verify(findToken, process.env.SECRET_TOKEN);

    if (!decodeToken) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decodeToken.userId).select('-password')

    if(!user){
        return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    req.user = user

    next()

  } catch (error) {
    console.log('Error while authenticated:- ', error.message);
    return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
  }
};
