import React from 'react'
import CurveContainerLeft from '../../components/common/CurveContainerLeft'
import CurveContainerRight from '../../components/common/CurveContainerRight'
import NavMenue from '../../components/navigation/NavMenue'
import ProfileHeader from '../../components/profile/ProfileHeader'

import Navbar from '../../components/navigation/Navbar'
// import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext';


export default function ProfilePage() {
    const {  user  } = useContext(AuthContext);

    // const [user, setUser] = useState({})

    // useEffect(() => {
    //     const apiCall = async () => {
    //         try {
    //             const res = await axios.get((apiEndpoint))
    //             setUser(res.data)
    //             console.log(res)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     } 
    //     apiCall()  
    // }, [])


   return (
    <div className="page-relative">
        <Navbar />
        <NavMenue></NavMenue> 
        {user &&
            <ProfileHeader 
            profileHeadline={user.username}
            profileSubheadline="Location"
            /> 
        }
       
        <main>
            <CurveContainerLeft></CurveContainerLeft>
            <CurveContainerRight></CurveContainerRight>
        </main>
    </div>
   )
}