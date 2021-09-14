import React, { Component } from 'react'
import classes from "./feature.module.css"
import { Link } from 'react-router-dom';
import { deleteFeature } from '../../actions/FeatureActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
export class FeatureItem extends Component {
    onDelete = id =>{
           this.props.deleteFeature(id)
    }
    render() {
        const {feature} = this.props;

        const {validToken, user} = this.props.security;

        const userIsAuthenticated = (
            <div>
            <Link to={`/updateFeature/${feature.featureIdentifier}`} className="btn btn-outline-secondary me-2" disabled>Update</Link>
               <button className="btn btn-danger" onClick={this.onDelete.bind(this, feature.featureIdentifier)}>Delete</button>
           </div>)


        let securedLinks;

        if(validToken&&user){
            securedLinks = userIsAuthenticated;
        }else{
            securedLinks = "";
        }

        const featureImage = `data:image/jpeg;base64,${feature.featureImage}`
        return (
            <div className={classes.container}>
            <div className={classes.card}>
           
            <div className={classes.leftSide} data-aos="fade-right">
            <Link to={`/featureTask/${feature.featureIdentifier}`} className={classes.imgLink} >
              <img src={featureImage} alt="..."/></Link>
        </div>
            <div className={classes.rightSide} data-aos="fade-left">
              <div className={classes.title}>
              <Link to={`/featureTask/${feature.featureIdentifier}`} 
              style={{ textDecoration: 'none',  color: "rgb(32, 32, 32)", 
              fontFamily: 'M PLUS 1p'}}>
               <h1 >{feature.featureHeading}</h1></Link>
               </div>
               <div className={classes.content} >
                <h5 className={classes.label_subHeading}>{feature.featureSubHeading}</h5>
                <p className={classes.label_paragraph}>{feature.featureDescription}</p>
              </div>
              <div className={classes.box}>
                {securedLinks}
                <div
               >
                  <div className={classes.bar}></div>
                </div>
          
                    </div>
            </div>          
          </div>
    </div>
        )
    }
}

FeatureItem.propTypes = {
    deleteFeature: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps, {deleteFeature})(FeatureItem)
