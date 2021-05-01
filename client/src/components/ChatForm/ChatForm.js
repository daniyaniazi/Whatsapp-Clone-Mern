import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperclip, faSmile } from "@fortawesome/free-solid-svg-icons";
import './ChatForm.scss'



const ChatForm = () => {
    return (
        <div className='chat-form'>
            <div className="action-btn">
                <FontAwesomeIcon className='icon-block' icon={faSmile} />
                <FontAwesomeIcon className='icon-block' icon={faPaperclip} />
            </div>

            <input className='chat-input' type="text" placeholder='Type a Message' />

            <FontAwesomeIcon icon={faMicrophone} className='icon-block' />



        </div>
    )
}

export default ChatForm
