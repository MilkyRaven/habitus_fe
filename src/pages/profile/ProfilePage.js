import React from 'react'
import CurveContainerLeft from '../../components/common/CurveContainerLeft'
import CurveContainerRight from '../../components/common/CurveContainerRight'
import NavMenue from '../../components/navigation/NavMenue'
import ProfileHeader from '../../components/profile/ProfileHeader'

import Navbar from '../../components/navigation/Navbar';


export default function ProfilePage() {
   return (
    <div className="page-relative">
        <Navbar />
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