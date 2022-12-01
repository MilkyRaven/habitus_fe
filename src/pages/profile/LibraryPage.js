import React, { useEffect, useState } from "react";
import axios from "axios";

const apiEndpoint = "http://localhost:8000/api/my-profile/library";

export default function LibraryPage() {

    const [library, setLibrary] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }})
            setLibrary(res.data)
        }

        apiCall()
    }, [])

    const deleteApiEndpoint = "http://localhost:8000/api/my-profile/library/";
    const deletePost = async (id) => {
        const token = localStorage.getItem("authToken");
        console.log(id);
        try {
            const res = await axios.put(deleteApiEndpoint + id + "/delete", {}, { headers: { Authorization: `Bearer ${token}` }}); 
            const newLibrary = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
            setLibrary(newLibrary.data)

            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }


    // console.log(library)

    return (
        <div>
            <h1>This is my Library</h1>
            {library.map((post) => {
                return (
                    <div key={post._id}>
                        <p>{post.creator.name}</p>
                        <p>{post.title}</p>
                        <img width={200} alt="post" src={post.image}></img>
                        <p>{post.createdAt.substring(0,10)}</p>
                        <button onClick={() => deletePost(post._id)}>Delete from library</button>
                    </div>
                )
            })}
        </div>
    )
}