import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CurveContainerRight from '../common/CurveContainerRight';


export default function CreateProfileForm () {
    const storedToken = localStorage.getItem('authToken')

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [goals, setGoals] = useState("")

    const onChangeUsernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onChangeGoalsHandler = (e) => {
        setGoals(e.target.value)
    }

    const [isCheckedMindfulness, setIsCheckedMindfulness] = useState(null)
    const [isCheckedFinances, setIsCheckedFinances] = useState(null)
    const [isCheckedHealth, setIsCheckedHealth] = useState(null)
    const [isCheckedTech, setIsCheckedTech] = useState(null)
    const [isCheckedConfidence, setIsCheckedConfidence] = useState(null)


    const onChangeMindfulnessHandler = (e) => {
        setIsCheckedMindfulness(e.target.value)
    }
    const onChangeFinancesHandler = (e) => {
        setIsCheckedFinances(e.target.value)
    }
    const onChangeHealthHandler = (e) => {
        setIsCheckedHealth(e.target.value)
    }
    const onChangeTechHandler = (e) => {
        setIsCheckedTech(e.target.value)
    }
    const onChangeConfidenceHandler = (e) => {
        setIsCheckedConfidence(e.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()


        const preferencesArr = []

        if(isCheckedMindfulness){
            preferencesArr.push(isCheckedMindfulness)
        }
        if(isCheckedFinances){
            preferencesArr.push(isCheckedFinances)
        }
        if(isCheckedHealth){
            preferencesArr.push(isCheckedHealth)
        } 
        if(isCheckedTech){
            preferencesArr.push(isCheckedTech)
        }
        if(isCheckedConfidence){
            preferencesArr.push(isCheckedConfidence)
        }

        console.log(preferencesArr)
        console.log(username, email, goals)

        try {
            const test1 = await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {myPreferences: preferencesArr}, {headers: {Authorization: `Bearer ${storedToken}`}})
            const test2 = await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {username, email, goals}, {headers: {Authorization: `Bearer ${storedToken}`}})

            console.log(test1, "Prefs")
            console.log(test2, "REST")

            navigate("/profile")

        } catch (err) {
            console.log(err)
        }
    } 


    return (

        <form onSubmit={submitHandler}>
            <section className="textinput-container form">
                <div className="form-row">
                  <label>Username</label>
                  <input type="text" name="username" value={username} onChange={onChangeUsernameHandler} />
               </div>
               <div className="form-row">
                  <label>Email</label>
                  <input type="email" name="email" value={email} onChange={onChangeEmailHandler} />
               </div>
               <div className="form-row">
                  <label>My Goals</label>
                  <textarea name="goals" onChange={onChangeGoalsHandler}></textarea>
               </div>
            </section>
            <CurveContainerRight className="category-checkbox-container">
                <h3>Interests</h3>
                <section className="category-flex-container">
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="mindfulness" 
                                value="mindfulness"
                                checked={isCheckedMindfulness}
                                onChange={onChangeMindfulnessHandler}
                            /> 
                            <span>Mindfulness</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="finances" 
                                value="finances" 
                                checked={isCheckedFinances}
                                onChange={onChangeFinancesHandler}
                            /> 
                            <span>Finances</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                            type="checkbox" 
                            name="health" 
                            value="health" 
                            checked={isCheckedHealth}
                            onChange={onChangeHealthHandler}
                            /> 
                            <span>Health</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="tech" 
                                value="tech" 
                                checked={isCheckedTech}
                                onChange={onChangeTechHandler}
                            /> 
                            <span>Tech</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="confidence" 
                                value="confidence" 
                                checked={isCheckedConfidence}
                                onChange={onChangeConfidenceHandler}
                            /> 
                            <span>Self Confidence</span>
                        </label>
                    </div>
                </section>

                <button className="button-blue-lg"type="submit">UPDATE</button>
            </CurveContainerRight>
        </form>

    )
}