import React, {useEffect, useState} from "react";
import axios from "axios";

const apiEndpoint = "http://localhost:8000/api/my-profile/library";

export default function LibraryPage () {

    const [library, setLibrary] = useState([]);
    
    useEffect(() => {
        const apiCall = async () => {
           const res = await axios.get(apiEndpoint)
           setLibrary(res.data)
        }
  
        apiCall()
     }, [])

    //  console.log(library)

    return(
        <div>
            <h1>This is my Library</h1>
                {library.forEach((post)=> {
                   return (
                    <div> 
                        <p>{post.creator}</p>
                        <p>{post.title}</p>
                        <p>{post.image}</p>
                        <p>{post.createdAt}</p>
                        <button>Delete from library</button>
                    </div>
                   )
                })}
        </div>
    )
}