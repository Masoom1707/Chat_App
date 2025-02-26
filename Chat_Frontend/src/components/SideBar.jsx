import React, { use, useEffect } from 'react'
import { userChatStore } from '../store/chatStore'
import { UsersRound } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const SideBar = () => {
    const {users,selectedUser,isUserLoading,getUsers,setSelectedUser} = userChatStore()

     const {onlineUser} = useAuthStore()

    useEffect(() =>{
        getUsers()
    }, [getUsers])

    if(isUserLoading) return <div>Loading...</div>

  return (
    
    <aside className='Side_bar'>
        <div className="side_bar_Upper">
            <div className="side_bar_logo">
                <UsersRound color='white' width={"20px"} /> <span>Contacts</span>
            </div>
        </div>
        <div className="sidebar_lower_div">
        {users.map((user) => (
            <button className={`sidebar_user_div ${selectedUser?._id === user._id ? 'bg1' : ''}`} key={user._id} onClick={() => setSelectedUser(user)}>
            <div className='sideBar_User_pic'>
                <img src={user.profilepic || "/images.png"} alt="Profile" />
            </div>
            <div className="sidebar-user-info">
                <p className='name'>{user.fullname}</p>
                <p className='online_status'>{onlineUser.includes(user._id) ? 'Online' : 'Offline'}</p>
            </div>
        </button>
        ))}
        </div>
    </aside>
  )
}

export default SideBar