import React from 'react'
import './Chat.scss';
import { shortFormatTime } from "../../utils/helper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Chat = ({ sessionId, friendName, chats }) => {
    // console.log(chats[0].time)
    const renderMsg = (msg) => {
        if (msg.type === 'file') {
            if (msg.theme === 'audio') {
                return <audio src={msg.value} />

            } else if (msg.theme === 'image') {
                return <img style={{ width: "200px" }} src={msg.value} alt="img-msg" />

            }

        }
        return msg.value
    }

    return (
        <div className='chat-section '>

            {chats[0] !== undefined ? (Object.keys(chats).map((key) => {

                return (
                    <div key={chats[key]._id} className={`chat ${sessionId === chats[key].senderId ? "you" : "me"}`}>

                        <span className="name">{sessionId === chats[key].senderId ? `${friendName}` : "You"}</span>
                        <p className="msg">{renderMsg(chats[key].msg)}</p>
                        <span className="time">{chats[key].time !== undefined ? shortFormatTime(chats[key].time) : "no time"}</span>
                    </div>)
            })) : (<div className="No-chat">
                <FontAwesomeIcon icon={faLock} className='icon-small' />
                Messages are not end-to-end encrypted. this is only a clone of whatsapp.</div>)
            }




        </div>
    )
}

export default Chat
