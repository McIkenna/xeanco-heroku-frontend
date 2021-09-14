import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"
import { deleteIntro } from '../../actions/IntroActions';
import classes from "./Intro.module.css"
import SearchBox from '../Layout/SearchBox';
import { Carousel } from 'react-bootstrap';

export class IntroItem extends Component {
    onDelete = id =>{
        this.props.deleteIntro(id)
 }
    render() {
        const {intro} = this.props;
        const {validToken, user} = this.props.security;

        const userIsAuthenticated = (
            <div>
            <Link to={`/updateIntro/${intro.id}`} className="btn btn-outline-secondary me-2">Update</Link>
            <button className="btn btn-danger" onClick={this.onDelete.bind(this, intro.id)}>Delete</button>
            </div>)


        let securedLinks;

        if(validToken&&user){
            securedLinks = userIsAuthenticated;
        }else{
            securedLinks = "";
        }
        const introImage = `data:image/jpeg;base64,${intro.image}`
        return (

            <div>
                <img
                className="d-block w-100"
                id={classes.backImage}
                src={introImage}
                alt = "Link..."
                />
            <Carousel.Caption>
            <div className={classes.text}>
            <h1>{intro.introName}</h1>
            <p className={classes.lead}>{intro.introDescription}</p>
           {securedLinks}
            </div>
            </Carousel.Caption>
                   </div>
             
                 )
    }
}

IntroItem.propTypes = {
    deleteIntro: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    security: state.security
})


export default connect(mapStateToProps, {deleteIntro})(IntroItem)
