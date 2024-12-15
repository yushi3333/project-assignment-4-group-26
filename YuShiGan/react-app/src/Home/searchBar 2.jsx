import React, {useState} from 'react'

function searchBar({onSearch}){
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = () => {
        onSearch(searchTerm.trim().toLowerCase());
    };

    return (
        <div style={{display: 'flex', justifyContent:'center', margin:'20px'}}>
            <input
                type='text'
                placeholder='Search Products'
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '10px 20px',
                    borderRadius:'25px',
                    border:'1px solid #ccc',
                    width: '150px',
                    fontSize: '16px',
                    outline: 'none',
                }}
            />
            <button onClick={handleSearch} style={{
                marginLeft: '5px',
                padding: '10px',
                borderRadius: '50%',  // Ensure the button is circular
                border: 'none',
                backgroundColor: 'black',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',  // Set fixed width and height for the button
                height: '40px'
            }}>
                {/* SVG for a magnifying glass icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16px" height="16px">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.61 1.57-4.23C16 6.01 13.99 4 11.5 4S7 6.01 7 8.5 8.01 13 10.5 13c1.62 0 3.09-.59 4.23-1.57l.27.28v.79l4.25 4.25c.41.41 1.07.41 1.49 0 .41-.41.41-1.07 0-1.49L15.5 14zm-5 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z" />
                </svg>
            </button>
        </div>
    )
}

export default searchBar;