import React from 'react'
import EditProfileHeader from '../../components/profile/ProfileHeader'
import CreateProfileForm from '../../components/profile/CreateProfileForm'


export default function EditProfile() {

    return (
     <div className="page-relative">
        <EditProfileHeader 
        profileHeadline="Edit Profile" 
        profileSubheadline="Change Image"
        />  

        <CreateProfileForm />
        
    </div>

    )
 }