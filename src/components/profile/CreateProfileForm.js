import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CurveContainerLeft from '../common/CurveContainerLeft';
import CurveContainerRight from '../common/CurveContainerRight';


export default function CreateProfileForm () {
    const storedToken = localStorage.getItem('authToken')

    const navigate = useNavigate()

    const [goals, setGoals] = useState("")

    const onChangeGoalsHandler = (e) => {
        setGoals(e.target.value)
    }

    const [isCheckedMindfulness, setIsCheckedMindfulness] = useState(null)
    const [isCheckedFinances, setIsCheckedFinances] = useState(null)
    const [isCheckedHealth, setIsCheckedHealth] = useState(null)
    const [isCheckedTech, setIsCheckedTech] = useState(null)
    const [isCheckedConfidence, setIsCheckedConfidence] = useState(null)


    const onChangeMindfulnessHandler = (e) => {
        if (isCheckedMindfulness) {
            setIsCheckedMindfulness(null)
        } else {setIsCheckedMindfulness(e.target.value)}
    }
    const onChangeFinancesHandler = (e) => {
        if (isCheckedFinances) {
            setIsCheckedFinances(null)
        } else {setIsCheckedFinances(e.target.value)}
        
    }
    const onChangeHealthHandler = (e) => {
        if (isCheckedHealth) {
            setIsCheckedHealth(null)
        } else {setIsCheckedHealth(e.target.value)}
    }

    const onChangeTechHandler = (e) => {
        if (isCheckedTech) {
        setIsCheckedTech(null)
        } else {setIsCheckedTech(e.target.value)}
    }

    const onChangeConfidenceHandler = (e) => {
        if (isCheckedConfidence) {
            setIsCheckedConfidence(null)
            } else {setIsCheckedConfidence(e.target.value)}
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
        console.log('this is goals', goals)

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {myPreferences: preferencesArr}, {headers: {Authorization: `Bearer ${storedToken}`}})
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {goals}, {headers: {Authorization: `Bearer ${storedToken}`}})
            navigate("/profile")

        } catch (err) {
            console.log(err)
        }
    } 


    return (

        <form onSubmit={submitHandler}>
            <section className="textinput-container form">
                <p>TELL US SOMETHING ABOUT YOU...</p>
                    <div className="form-row">
                    <label>My Goals: </label>
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