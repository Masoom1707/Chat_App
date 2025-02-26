import mongoose from "mongoose";

const messageModel = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: String,
    image: String
},{timestamps:true})

export const Message = mongoose.model("Message", messageModel)