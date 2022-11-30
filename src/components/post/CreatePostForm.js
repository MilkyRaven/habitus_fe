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
            console.log(val)
            
            if(prev.includes(val)) { 
                const clone = [...prev];
                clone.splice(prev.indexOf(val), 1)
                return clone;
            } else {
            return [...prev, val]
            }
        })
        console.log(select)
        
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
        const {title, description, type, image} = input
        const obj = {
            title: title,
            description: description,
            categories: select,
            type: type,
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
               <input required type="text" name="itle" value={input.title} onChange={handleChange} />
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
            <div className="form-select-container">
                <label className="label-subtitle" for="type">Post-Type</label>
                <select name="type" id="type" onChange={handleChange}>
                    <option value="Knowledge" >Knowledge</option>
                    <option value="Meeting" >Meeting</option>
                </select>
            </div>
            <div className="media-upload-container">
               <label className="label-subtitle">Post-Image</label>
               <input type="file" name="image" onChange={(event) => handleFileUpload(event)} />            
            </div>
            <button className="button-blue-lg" type='submit'>Post</button>
        </form>
    )
    
}