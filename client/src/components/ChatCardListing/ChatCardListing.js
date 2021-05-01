import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import './ChatCardListing.scss';


const ChatCardListing = () => {
    return (
        <div className="chat-cards-listing">
            <div className="card">
                <div className="img-container">
                    <img src="https://st3.depositphotos.com/15648834/17930/v/1600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="imge" srcset="" />
                </div>
                <div className="card-detail">
                    <h4 className="title">user1</h4>
                    <p className="desc">hi how are you</p>
                </div>

                <div className="time">
                    10:20 Pm
                </div>
                <div className="action-btn">
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </div>
    )
}

export default ChatCardListing
