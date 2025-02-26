import React from 'react'
import { userChatStore } from '../store/chatStore'
import SideBar from './SideBar'
import NoChat from './NoChat'
import ChatContainer from './ChatContainer'

const HomePage = () => {
  const {selectedUser} = userChatStore()
  return (
    <div className="main_container">
      <div className="chat_page_container">
        <SideBar />
    
        {!selectedUser ? <NoChat /> : <ChatContainer /> }
      </div>
    </div>
  )
}

export default HomePage