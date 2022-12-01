import axios from 'axios'
import React, {  useState } from 'react'
import './CreatePostForm.css'


export default function CreatePostForm (props) {
    const storedToken = localStorage.getItem('authToken')

    const { closeModalHandler } = props
    
    const [select, setSelect] = useState([])

    const [input, setInput] = useState({
        title: "",
        description: "",
        categories: [],
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
            const val = event.target.value
            
            if(prev.includes(val)) { 
                const clone = [...prev];
                clone.splice(prev.indexOf(val), 1)
                return clone;
            } else {
            return [...prev, val]
            }
        })        
    }
        

    const handleFileUpload = async (event) => {
     
        const uploadData = new FormData();
        uploadData.append("image", event.target.files[0]);

        try {
            const fileDate = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {headers: {Authorization: `Bearer ${storedToken}`}})

            setInput ((prev) => {
                return {
                    ...prev,
                    image: fileDate.data.fileUrl
                    } 
            })

        } catch (err) {
            console.log(err)
        }   
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const {title, description, image} = input
        const obj = {
            title: title,
            description: description,
            categories: select,
            image: image
        }
        console.log(obj, "Submit")

         try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/feed/new-post`, obj, {headers: {Authorization: `Bearer ${storedToken}`}})

        } catch (err) {
            console.log(err)
        } 

        closeModalHandler()
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="form-row">
               <label className="label-subtitle">Post Title</label>
               <input required type="text" name="title" value={input.title} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label className="label-subtitle">Description</label>
                <textarea name="description" rows="4" cols="39" value={input.description} onChange={handleChange}></textarea>            
            </div>
            <div className="form-radio-container">
                
                <label className="label-subtitle">Interests</label>
                <div className="radio-container">

                        <input className="radio-inputs"
                            type="radio" 
                            name="mindfulness" 
                            value="Mindfulness"
                            onChange={handleSelection}
                        /> 
                        <label>Mindfulness</label>

                        <input className="radio-inputs"
                            type="radio"  
                            name="finances" 
                            value="Finances" 
                            onChange={handleSelection}
                        /> 
                        <label>Finances</label>

                        <input className="radio-inputs"
                            type="radio"  
                            name="health" 
                            value="Health" 
                            onChange={handleSelection}
                        /> 
                        <label>Health</label>

                        <input className="radio-inputs"
                            type="radio"  
                            name="tech" 
                            value="Tech" 
                            onChange={handleSelection}
                        /> 
                        <label>Tech</label>

                        <input className="radio-inputs"
                            type="radio"  
                            name="confidence" 
                            value="Self Confidence" 
                            onChange={(event) =>handleSelection(event) }
                        /> 
                        <label>Self Confidence</label>

                </div>
            </div>

            <div className="media-upload-container">
               <label className="label-subtitle">Post-Image</label>
               <input type="file" name="image" onChange={(event) => handleFileUpload(event)} />            
            </div>
            <button className="button-blue-lg" type='submit'>Post</button>
        </form>
    )
    
}