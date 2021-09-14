import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"
import { getAbouts } from '../../actions/AboutActions';
import { deleteAbout } from '../../actions/AboutActions';
import style from "./about.module.css"
import ValidateAbout from './ValidateAbout';

export class About extends Component {
    onDelete = id =>{
        this.props.deleteAbout(id)
 }
    componentDidMount(){
         this.props.getAbouts();
         //this.props.getFeatureTask();
     }


    render() {
        const {abouts} = this.props.about;
        const {validToken, user} = this.props.security;  
        return (
    <div className={style.aboutContainer}>
   {abouts.map((about) => (
         <div className={style.content} key={about.id}>
         <div className={style.card}>
         <div className={style.card_header}><h1>{about.aboutName}</h1></div>
       <div className={style.card_body}>
         <div className={style.card_title}><h2>{about.aboutHeading}</h2></div>
         <div className={style.card_subTitle}><h4>{about.aboutSubHeading}</h4></div>
         <p className={style.card_text}>{about.aboutDescription}</p>
       </div>
       </div>
     <ValidateAbout 
     validToken = {validToken}
     user = {user}
     about = {about}
     onClick={this.onDelete.bind(this, about.id)}
     />
       </div>
   ))}
</div>
        )
    }
}

About.propTypes = {
    deleteAbout: PropTypes.func.isRequired,
    getAbouts: PropTypes.func.isRequired,
    about : PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    about : state.about,
    security: state.security
})
export default connect(mapStateToProps, {getAbouts, deleteAbout})(About)
