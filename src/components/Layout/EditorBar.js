import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LinkButton from '../LinkButton'
import { connect } from 'react-redux'
import PropTypes from "prop-types"

export class EditorBar extends Component {
    render() {

        const {validToken, user} = this.props.security;


        const userIsAuthenticated = (
           <div>
               
                <LinkButton to="/addFeature" title="Create Feature" className="btn btn-outline-secondary me-2" />
                <LinkButton to="/addProduct" title="Create Product" className="btn btn-outline-primary me-2" />
                <LinkButton to="/addAbout" title="Create About" className="btn btn-outline-primary me-2" />
                <LinkButton to="/addIntro" title="Create Intro" className="btn btn-outline-primary me-2" />
                <LinkButton to="/addClient" title="Create CLient" className="btn btn-outline-primary me-2" />
                <LinkButton to="/addExtra" title="Create Extra" className="btn btn-outline-primary me-2" />

            <button className="btn btn-outline-success me-2" type="button">Main button</button>
            <button className="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
            <div ><Link to="/" style={{color: "#2b6777", textDecoration:"none"}} ><p>Logged in as {user.sub}</p></Link></div>
            </div>
        )

        const userIsNotAuthenticated =(
            <div>
 
            </div>
        )

        let headlinks;
    
        if(validToken&&user){
            headlinks = userIsAuthenticated
        }else{
            headlinks = userIsNotAuthenticated;
        }

        return (
            <form className="container-fluid justify-content-start">
               
                {headlinks}
  
                </form>
        )
    }
}

EditorBar.propTypes ={
    security: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    security: state.security
  })
  

export default connect(mapStateToProps)(EditorBar)
