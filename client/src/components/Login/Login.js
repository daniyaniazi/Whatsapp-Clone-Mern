import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Login.scss';

const Login = ({ handleLogin }) => {

    const [user, setuser] = useState({ name: "", profileImg: {} });

    const handleSubmit = (e) => {
        console.log("before handleSubmit", user)
        e.preventDefault()
        handleLogin(user)
    }
    const onFileChange = (e) => {
        setuser({ ...user, profileImg: e.target.files[0] })

    }

    const onHandleNameChange = (e) => {
        setuser({ ...user, name: e.target.value })
    }
    return (
        <div className="login-container">
            <div className="logo">
                <img src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png" alt='whatsapp=logo' />
            </div>
            <div className="login-form">
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div className="profile-img">
                        <input className="file-upload" type="file" onChange={(e) => onFileChange(e)} name='profileImg' />
                        <FontAwesomeIcon className="icon-block" icon={faUser} />
                    </div>
                    <div className="profile-name">
                        <FontAwesomeIcon className="icon-block" icon={faUser} />
                        <input placeholder="Your name here" type="text" name="name" onChange={(e) => onHandleNameChange(e)} />
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
