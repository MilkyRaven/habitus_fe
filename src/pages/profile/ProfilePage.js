import React from 'react'
import CurveContainerLeft from '../../components/common/CurveContainerLeft'
import CurveContainerRight from '../../components/common/CurveContainerRight'
import NavMenue from '../../components/navigation/NavMenue'
import ProfileHeader from '../../components/profile/ProfileHeader'
import EditProfileHeader from '../../components/profile/ProfileHeader'


export default function ProfilePage() {
   return (
    <div className="page-relative">
        <NavMenue></NavMenue> 
        <ProfileHeader 
            profileHeadline="@Username" 
            profileSubheadline="Location"
            /> 
        {/* <EditProfileHeader 
        profileHeadline="Welcome" 
        profileSubheadline="Upload Image"
        />  */}
        <main>
            <CurveContainerLeft></CurveContainerLeft>
            <CurveContainerRight></CurveContainerRight>
        </main>
    </div>
   )
}