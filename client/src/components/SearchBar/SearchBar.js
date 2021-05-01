import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './SearchBar.scss';


const SearchBar = () => {
    return (
        <div className="search">
            <FontAwesomeIcon className='icon-block ' icon={faSearch} />
            <input type="text" name="" id="" placeholder='search or start new chat' />
        </div>
    )
}

export default SearchBar
