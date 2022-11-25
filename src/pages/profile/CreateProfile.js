import React from 'react'
import EditProfileHeader from '../../components/profile/EditProfileHeader'
import CreateProfileForm from '../../components/profile/CreateProfileForm';


export default function CreateProfile() {

    return (
     <div className="page-relative">
        <EditProfileHeader 
        profileHeadline="Welcome" 
        profileSubheadline="Upload Image"
        />  
        <CreateProfileForm />
    </div>

    )
 }