import axios from 'axios'
import React, { useState } from 'react'


export default function CreateProfileForm () {
    const storedToken = localStorage.getItem('authToken')

   

    const [imageUrl, setImageUrl] = useState("")

    const [select, setSelect] = useState([])

    const [input, setInput] = useState({
        title: "",
        description: "",
        categories: [],
        type: "Knowledge",
        image: "",
        })

    const handleChange = (event) => { 
        setInput (prev => {
            return {
            ...prev,
            [event.target.name]: event.target.value
            }
        })
    }

    const handleSelection = (event) => { 

        setSelect ((prev) => {
            let val = event.target.value

            if(prev.includes(val)) { 
                const clone = [...prev];
                clone.splice(prev.indexOf(val), 1)
                return clone;
            } else {
            return [...prev, val]
            }
        })
        setInput ((prev) => {
            return {
                ...prev,
                categories: select
                }
        })
        
    }

    const handleFileUpload = async (event) => {
        console.log("The file to be uploaded is: ", event.target.files[0]);
     
        const uploadData = new FormData();
        uploadData.append("image", event.target.files[0]);

        try {
            const fileDate = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {headers: {Authorization: `Bearer ${storedToken}`}})
            console.log(fileDate, "image")

            setImageUrl(fileDate.fileUrl)
            setInput ((prev) => {
                return {
                    ...prev,
                    image: imageUrl
                    } 
            })

        } catch (err) {
            console.log(err)
        } 

        
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(input, "Submit")

         try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/feed/new-post`, input, {headers: {Authorization: `Bearer ${storedToken}`}})

        } catch (err) {
            console.log(err)
        } 
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="form-row">
               <label>Post-Title</label>
               <input required type="text" name="title" value={input.title} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label>Description</label>
                <textarea name="description" rows="4" cols="39" value={input.description} onChange={handleChange}></textarea>            
            </div>
            <div className="form-checkbox">
                <label>Interests</label>
                <input 
                    type="checkbox" 
                    name="mindfulness" 
                    value="Mindfulness"
                    onChange={handleSelection}
                /> Mindfulness
                <input 
                    type="checkbox" 
                    name="finances" 
                    value="Finances" 
                    onChange={handleSelection}
                /> Finances
                <input 
                    type="checkbox" 
                    name="health" 
                    value="Health" 
                    onChange={handleSelection}
                /> Health
                <input 
                    type="checkbox" 
                    name="tech" 
                    value="Tech" 
                    onChange={handleSelection}
                /> Tech
                <input 
                    type="checkbox" 
                    name="confidence" 
                    value="Self Confidence" 
                    onChange={handleSelection}
                /> Self Confidence
            </div>
            <div className="form-select">
                <label for="type">Post-Type</label>
                <select name="type" id="type" onChange={handleChange}>
                {/* <select name="type" id="type" onChange={(event) => setInput (prev => { return {...prev,[event.target.name]: event.target.value}})} value={input.type.value}></select> */}
                    <option value="Knowledge" >Knowledge</option>
                    <option value="Meeting" >Meeting</option>
                </select>
            </div>
            <div className="media-upload">
               <label>Post-Title</label>
               <input type="file" onChange={(event) => handleFileUpload(event)} />            
            </div>
            <button type='submit'>Post</button>
        </form>
    )
    
}