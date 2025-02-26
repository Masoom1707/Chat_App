import { Message } from "../model/messageModel.js";
import { User } from "../model/userModel.js";
import { cloudinary } from "../utils/cloudinary.js";
import { getReceiverSocektId, io } from "../utils/socket.js";

export const getUserData = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      return res
        .status(400)
        .json({ success: false, message: "Can't find the user" });
    }
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getting  user data:- ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting  Message:- ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // upload to cloudinary
      const uploadData = await cloudinary.uploader.upload(image);
      imageUrl = uploadData.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocektId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error In Sending message:- ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
