import React, { useEffect, useRef, useState } from 'react'
import { userChatStore } from '../store/chatStore'
import { Send, X,Image } from 'lucide-react'
import toast from 'react-hot-toast'

const ChatInput = () => {
    const [text, setText] = useState("")
    const [showImage, setShowImage] = useState(null)
    const fileInputRef = useRef(null)
    const {sendMessages} = userChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file.type.startsWith('image/')){
            toast.error('Please select an image file')
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            setShowImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setShowImage(null)
        if(fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleSendMessages = async(e) => {
        e.preventDefault();
        if(!text.trim() && !showImage) return;

        try {
            await sendMessages({
                text: text.trim(),
                image: showImage
            })

            setText("")
            setShowImage(null)
        if(fileInputRef.current) fileInputRef.current.value = ""


        } catch (error) {
            console.log('Failed to send the messages', error);
            
        }
    }


  return (
    <div className="message_container">
      {showImage && (
         <div className="showMsg">
         <div className="showImg_container">
              <img src={showImage} alt="" />
          </div>
          <button className='close close_img' onClick={removeImage} type='button'>
              <X style={{backgroundColor:"black", color:"white", width:"15px",height:"15px", borderRadius:"50%"}} />
          </button>
         </div>
      )}

      <form className="input_message_send" onSubmit={handleSendMessages}>
        <input type="text" placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />
        <input type="file" accept='image/*' ref={fileInputRef} onChange={handleImageChange} style={{display:'none'}} />
        <button className='close' type='submit' disabled={!text.trim() && !showImage}><Send style={{ color:"white", width:"20px",height:"20px"}} /></button>
        <button className='close' type='button' onClick={() => fileInputRef.current?.click()}><Image style={{ color:"white", width:"25px",height:"25px"}}  /></button>
      </form>
    </div>
  )
}

export default ChatInput