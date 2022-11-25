import React from 'react'
import CurveContainerLeft from '../../components/common/CurveContainerLeft'
import CurveContainerRight from '../../components/common/CurveContainerRight'
import NavMenue from '../../components/navigation/NavMenue'
import ProfileHeader from '../../components/profile/ProfileHeader'


export default function ProfilePage() {
   return (
    <div className="page-relative">
        <NavMenue></NavMenue> 
        <ProfileHeader 
            profileHeadline="@Username" 
            profileSubheadline="Location"
            /> 
        <main>
            <CurveContainerLeft></CurveContainerLeft>
            <CurveContainerRight></CurveContainerRight>
        </main>
    </div>
   )
}