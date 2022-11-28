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

    console.log(library)

    return (
        <div>
            <h1>This is my Library</h1>
            {library.map((post) => {
                return (
                    <div key={post._id}>
                        <p>{post.creator.name}</p>
                        <p>{post.title}</p>
                        <img width={200} alt="post" src={post.image}></img>
                        <p>{post.createdAt}</p>
                        <button>Delete from library</button>
                    </div>
                )
            })}
        </div>
    )
}