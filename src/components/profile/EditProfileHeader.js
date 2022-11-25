import React from 'react'
import './ProfileComponents.css'
import defaultUser from '../../assets/images/default-user-placeholder.png'

export default function EditProfileHeader(props) {

    const {profileHeadline, profileSubheadline} = props

    return (
        <section id="edit-profile-header">
        <div className="curved corner-t-right t-right-grey"></div>
            <div className="flex-header">
                <div className="profile-img-container-lg">
                    <img className="profile-img-lg" src={defaultUser} alt="default-user"/>
                </div>
                <div>
                    <p className="profile-headline" >{profileHeadline}</p>
                    <p className="profile-subheadline" >{profileSubheadline}</p>
                </div>
            </div>
        </section>
    )
}