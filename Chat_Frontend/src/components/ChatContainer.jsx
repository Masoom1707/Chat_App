import React, { useEffect, useRef } from "react";
import { userChatStore } from "../store/chatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    message,
    selectedUser,
    isMessagesLoading,
    getUserMessages,
    subscribeToMessages,
    unsubscribeFromMessage,
  } = userChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getUserMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessage();
  }, [
    selectedUser._id,
    getUserMessages,
    subscribeToMessages,
    unsubscribeFromMessage,
  ]);

  useEffect(() => {
    if (messageEndRef.current && message) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  if (isMessagesLoading) return <div>Loading Messages...</div>;

  return (
    <div className="chat_container ">
      <ChatHeader />
      <div className="message_div" >
        {message.map((messages) => (
          <div
          ref={messageEndRef}
            key={messages._id}
            className={`chat ${
              messages.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-section">
              <div
                className={`${
                  messages.senderId === authUser._id ? "no-avt" : "avatar"
                }`}
              >
                <img
                  src={
                    messages.senderId === authUser._id
                      ? authUser.profilepic || "/images.png"
                      : selectedUser.profilepic || "/images.png"
                  }
                  alt="profile"
                />
              </div>
              <div
                className={` ${
                  messages.senderId === authUser._id
                    ? "text_msg br-1"
                    : "text_msg br-2"
                }`}
              >
                {messages.image && (
                  <div className="attachment_div">
                    <img
                      src={messages.image}
                      alt="Attachment"
                      className="Attachment"
                    />
                  </div>
                )}
                {messages.text && (
                  <p className="tex_msg-send">{messages.text}</p>
                )}
                <div className="chat-header">
                  <time className="time">
                    {formatMessageTime(messages.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
