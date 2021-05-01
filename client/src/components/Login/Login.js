import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Login.scss';

const Login = () => {
    return (
        <div className="login-container">
            <div className="logo">
                <img src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png" />
            </div>
            <div className="login-form">
                <form >
                    <div className="profile-img">
                        <input className="file-upload" type="file" />
                        <FontAwesomeIcon className="icon-block" icon={faUser} />
                    </div>
                    <div className="profile-name">
                        <FontAwesomeIcon className="icon-block" icon={faUser} />
                        <input placeholder="Your name here" type="text" name="name" />
                    </div>
                    <input
                        type="submit"
                        className="profile-submit-btn"
                        value="Join now"
                    />
                </form>
            </div>
        </div>
    )
}

export default Login
