{message.map((message) => (
    <div
      key={message._id}
      className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="">
          <img
            src={
              message.senderId === authUser._id
                ? authUser.profilepic || "/avatar.png"
                : selectedUser.profilepic || "/avatar.png"
            }
            alt="profile pic"
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>
      <div className="">
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className=""
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  ))}