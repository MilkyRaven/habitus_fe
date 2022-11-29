import React from 'react'
import './ProfileComponents.css'
import { Link } from "react-router-dom";
import defaultUser from '../../assets/images/default-user-placeholder.png'

export default function ProfileHeader(props) {

    const {profileHeadline, profileSubheadline} = props

    return (
        <section id="profile-header">
            <div className="flex-header">
                <div className="profile-img-container-lg">
                    <img className="profile-img-lg" src={defaultUser} alt="default-user"/>
                </div>
                <div>
                    <p className="profile-headline" >{profileHeadline}</p>
                    <p className="profile-subheadline" >{profileSubheadline}</p> 
                </div>
                <div>
                    <Link to="/edit-profile" className="menue-icon-container"><i className="fa-solid fa-pen menue-icon"></i></Link>
                </div>
            </div>
            <div className="curved corner-t-right t-right-grey2"></div>
        </section>
    )
}