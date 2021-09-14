import React from 'react'
import classes from "../Feature/feature.module.css"
const SearchBox = (props) =>  {
    return (
        <div >
        
        <input 
        className="form-control me-4" 
        type="search" 
        placeholder="Search" 
        aria-label="Search"
        className={props.class}

        value = {props.value}
        onChange={props.onChange}
                    />

        </div>
    )
}

export default SearchBox
