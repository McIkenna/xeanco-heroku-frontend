import React from 'react'
import {Link} from "react-router-dom"

const LinkButton = (props) => {
    return (
        <React.Fragment>
            <Link to={props.to} className={props.className}>{props.title}</Link>
        </React.Fragment>
    )
}

export default LinkButton
