import React from 'react'
import './FindUsers.css'

export default function SearchUsersBar(props) {
    const { onSearch } = props
    return (
        <div className='search-bar-container'>
            <div className='search-bar'>
                <input className='input'
                    type="text"
                    placeholder='search users here'
                    onChange={(event) => onSearch(event.target.value)}
                >
                </input>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
