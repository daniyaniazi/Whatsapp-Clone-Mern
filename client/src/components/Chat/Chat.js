import React from 'react'
import './Chat.scss';


const Chat = () => {
    return (
        <div className='chat-section '>
            <div className='chat you'>
                <span className="name">Daniya</span>
                <p className="msg">This is message</p>
                <span className="time">10:23 Pm</span>
            </div>

            <div className='chat me'>
                <span className="name">Daniya</span>
                <p className="msg">This is message</p>
                <span className="time">10:23 Pm</span>
            </div>



        </div>
    )
}

export default Chat
