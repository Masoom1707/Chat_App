import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const jwtToken = jwt.sign({ userId }, process.env.SECRET_TOKEN, {
      expiresIn: process.env.SECRET_TOKEN_EXPIRY,
    });
    if (!jwtToken) {
      return res
        .status(500)
        .json({ success: false, message: "jwtToken not generated correctly" });
    }
    res.cookie("token", jwtToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return jwtToken;
  } catch (error) {
    console.log('Error in the generate Token Function', error.message);
    res.status(500).json({ success: false, message: "Error in generating Token" });
  }
};
