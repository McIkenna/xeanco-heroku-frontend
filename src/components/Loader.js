import React from 'react'
import {Container, Spinner} from "react-bootstrap"

function Loader() {
    return (
     
        <Spinner animation="border" role="status"
        variant="success"
        style={
            {
                height:'100px',
                width: '100px',
                margin: '25% 50%',
                display: 'block'
            }
        }>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
     
    )
}

export default Loader