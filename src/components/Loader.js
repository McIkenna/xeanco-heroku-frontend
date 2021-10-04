import React from 'react'
import {Container, Spinner} from "react-bootstrap"

function Loader({style}) {
    return (
     
        <Spinner animation="border" role="status"
        variant="success"
        style={
           style}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
     
    )
}

export default Loader