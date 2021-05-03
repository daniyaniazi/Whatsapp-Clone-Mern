import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser, } from "@fortawesome/free-solid-svg-icons";
import './ChatHeader.scss'
import { formatDate } from "../../utils/helper";

const ChatHeader = ({ friendInfo }) => {
    const { isOnline, profileImg, name, updatedAt } = friendInfo

    return (
        <div className='chat-header'>
            <div className="img-container">
                {profileImg ? <img src={profileImg} alt="img" /> : <FontAwesomeIcon icon={faUser} />}

            </div>
            <div className="card-detail">
                <h4 className="title">{name ? name : "Unnamed User"}</h4>
                <p className="desc">{isOnline ? "Online" : `Last seen ${updatedAt ? formatDate(updatedAt) : ""}`}</p>
            </div>

            <div className="action-items">
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
        </div>
    )
}

export default ChatHeader
