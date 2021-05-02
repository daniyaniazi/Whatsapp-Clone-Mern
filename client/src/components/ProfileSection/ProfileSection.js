import React, { useContext } from 'react'
import './ProfileSection.scss'
import AuthContext from "../../context/AuthContext";

const ProfileSection = ({ handleLogout }) => {
    const user = useContext(AuthContext);
    const { profileImg, name } = user


    return (
        <div className="profile-section">
            <div className="img-container">
                <img src={profileImg} alt="img" />
            </div>
            {name}
            <div className="action-icons btn" onClick={handleLogout}>
                Log Out
            </div>
        </div>
    )
}

export default ProfileSection
