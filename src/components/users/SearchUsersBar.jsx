import React from 'react'

export default function SearchUsersBar(props) {
    const { onSearch } = props
    return (
        <div>SearchUsers
            <div>
                <input className='input'
                    type="text"
                    placeholder='search users here'
                    onChange={(event) => onSearch(event.target.value)}
                >
                </input>
            </div>
        </div>
    )
}
