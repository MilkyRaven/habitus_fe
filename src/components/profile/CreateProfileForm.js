import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


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
        console.log('this is goals', goals)

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {myPreferences: preferencesArr}, {headers: {Authorization: `Bearer ${storedToken}`}})
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {goals}, {headers: {Authorization: `Bearer ${storedToken}`}})
            navigate("/feed")

        } catch (err) {
            console.log(err)
        }
    } 


    return (

        <form onSubmit={submitHandler}>
            <p>TELL US SOMETHING ABOUT YOU...</p>
            <label>My Goals: </label>
            <textarea name="goals" onChange={onChangeGoalsHandler}></textarea>

            <label>Interests</label>
            <input 
                type="checkbox" 
                name="mindfulness" 
                value="mindfulness"
                checked={isCheckedMindfulness}
                onChange={onChangeMindfulnessHandler}
            /> Mindfulness

            <input 
                type="checkbox" 
                name="finances" 
                value="finances" 
                checked={isCheckedFinances}
                onChange={onChangeFinancesHandler}
            /> Finances

            <input 
                type="checkbox" 
                name="health" 
                value="health" 
                checked={isCheckedHealth}
                onChange={onChangeHealthHandler}
            /> Health

            <input 
                type="checkbox" 
                name="tech" 
                value="tech" 
                checked={isCheckedTech}
                onChange={onChangeTechHandler}
            /> Tech

            <input 
                type="checkbox" 
                name="confidence" 
                value="confidence" 
                checked={isCheckedConfidence}
                onChange={onChangeConfidenceHandler}
            /> Self Confidence

            <button type="submit">DONE</button>
        </form>

    )
}