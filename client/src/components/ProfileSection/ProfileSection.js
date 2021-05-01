import React from 'react'
import './ProfileSection.scss'


const ProfileSection = () => {
    return (
        <div className="profile-section">
            <div className="img-container">
                <img src="https://st3.depositphotos.com/15648834/17930/v/1600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="img" />
            </div>
            <div className="action-icons">
                Log Out
            </div>
        </div>
    )
}

export default ProfileSection
