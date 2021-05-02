import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, } from "@fortawesome/free-solid-svg-icons";
import './ChatHeader.scss'


const ChatHeader = () => {
    return (
        <div className='chat-header'>
            <div className="img-container">
                <img src="https://st3.depositphotos.com/15648834/17930/v/1600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="img" />
            </div>
            <div className="card-detail">
                <h4 className="title">User</h4>
                <p className="desc">Online</p>
            </div>

            <div className="action-items">
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
        </div>
    )
}

export default ChatHeader
