import React, { useEffect } from 'react'
import { userChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore'
import { CircleX, Cross } from 'lucide-react'

const ChatHeader = () => {

    const {selectedUser,setSelectedUser} = userChatStore()
    const {onlineUser} = useAuthStore()

  return (
    <div className="chatHeader">
        <div className="chat_header_div">
            <div className="chat_profile_info">
            <div className='sideBar_User_pic'>
                <img src={selectedUser.profilepic || "./public/images.png"} alt="Profile" />
            </div>
            <div className='chat_header_info'>
                <p>{selectedUser.fullname}</p>
                <p>{onlineUser.includes(selectedUser._id) ? 'Online' : 'Offline'}</p>
            </div>
            </div>
            <button onClick={() => setSelectedUser(null)} className='close'>
            <CircleX color='white' width={"15px"}/>
            </button>
        </div>
    </div>
  )
}

export default ChatHeader