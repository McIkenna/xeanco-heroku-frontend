import React from 'react'
import {Link} from "react-router-dom"
const ValidateAbout = (props) => {
    const user = props.user;
    const validToken = props.validToken;
    const about = props.about;
    const clicked = props.onClick;
    const userIsAuthenticated = (
        <div>
    <button className="btn btn-danger" onClick={clicked}>Delete</button>
    <Link to={`/updateAbout/${about.id}`} className="btn btn-outline-secondary me-2" disabled>Update</Link>   
    </div>)


    if(validToken&&user){
        return (userIsAuthenticated);
    }else{
        return ("");
    }

}

export default ValidateAbout
