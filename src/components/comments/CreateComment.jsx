import axios from 'axios'
import React, {  useState } from 'react'
import { useParams } from 'react-router-dom'


export default function CreatePostForm () {
    const { postId } = useParams()
    const storedToken = localStorage.getItem('authToken')


    const [input, setInput] = useState({
        content: ""
        })

    const handleChange = (event) => { 
        setInput (prev => {
            return {
            ...prev,
            [event.target.name]: event.target.value
            }
        })
    }
        
    const submitHandler = async (event) => {
        event.preventDefault()
        const {content} = input
        const obj = {
            content: content
        }
        console.log(obj, "Submit")

         try {
            await axios.post(`http://localhost:8000/api/feed/${postId}/new-comment`, obj, {headers: {Authorization: `Bearer ${storedToken}`}})

        } catch (err) {
            console.log(err)
        } 
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="form-row">
                <label>Leave your comment here</label>
                <textarea name="content" rows="4" cols="39" value={input.content} onChange={handleChange}></textarea>            
            </div>
            <button type='submit'>Comment</button>
        </form>
    )
    
}