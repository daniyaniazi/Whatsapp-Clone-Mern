import React from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import './ChatCardListing.scss';
import { shortFormatTime } from "../../utils/helper";

const ChatCardListing = ({ friendList, }) => {

    const recentMessage = (data) => {
        let msg = ''

        if (data.recentMsg && data.recentMsg.msg) {
            if (data.recentMsg.msg.type === "message") {
                msg = data.recentMsg.msg.value
            }
            else if (data.recentMsg.msg.type === "file") {
                msg = "Media shared"
            }
            else if (data.recentMsg.msg.type === "typing") {
                msg = <i style={{ color: "#a7a7a7" }}>typing</i>
            }
            else {
                msg = "start a new chat"
            }
        } else {
            msg = "start a new chat"
        }

        return msg

    }
    return (
        <div className="chat-cards-listing">
            {Object.keys(friendList).map(key => {
                return (
                    <NavLink key={key} className='note-card' to={`/${key}`}>
                        <div className="card">
                            <div className="img-container">
                                {friendList[key].profileImg ? (<img src={friendList[key].profileImg} alt="imge" />) : (<FontAwesomeIcon className='icon-block' icon={faUser} />)}

                            </div>
                            <div className="card-detail">
                                <h4 className="title">{friendList[key].name}</h4>
                                <p className="desc">{recentMessage(friendList[key])}</p>
                            </div>

                            <div className="time">
                                {friendList[key].recentMsg && shortFormatTime(friendList[key].recentMsg.time)}
                            </div>
                            <div className="action-btn">
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div></NavLink>)
            })}
        </div>
    )
}

export default ChatCardListing
