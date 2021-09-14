import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { deleteExtra } from '../../actions/ExtraAction';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import styles from "./Extra.module.css";


export class ExtraItem extends Component {
    constructor(){

        super();
        this.state = {
            isToggleOn: false
        }
        this.onClickeRead = this.onClickeRead.bind(this)
    }

    onClickeRead =()=>{
     this.setState(   prevState => ({
            isToggleOn: !prevState.isToggleOn
        })
     )
    }

    onDelete = id =>{
        this.props.deleteExtra(id)
 }
    render() {
        const {extra} = this.props;
        const {validToken, user} = this.props.security;

        const userIsAuthenticated = (
            <div>
             <Link to={`/updateExtra/${extra.id}`} className="btn btn-outline-secondary me-2" disabled>Update</Link>
    <button className="btn btn-danger" onClick={this.onDelete.bind(this, extra.id)}>Delete</button>
   	   </div>)


        let securedLinks;

        if(validToken&&user){
            securedLinks = userIsAuthenticated;
        }else{
            securedLinks = "";
        }

        const extraImage1 = `data:image/jpeg;base64,${extra.img1}`
        const extraImage2 = `data:image/jpeg;base64,${extra.img2}`
        const extraImage3 = `data:image/jpeg;base64,${extra.img3}`
        const extraImage4 = `data:image/jpeg;base64,${extra.img4}`

        return (
    <div className={styles.slide}>
    <div className={this.state.isToggleOn? styles.card_toggled: styles.card }>
    <div className={styles.card__content}>
    <img className={styles.card_img_top} src={extraImage1} alt="2"/>
    <div className={styles.overlay}>
    <div className={styles.card__content_text}>
    <h2 className={styles.card__content_header}>{extra.extraName}</h2>
    <p className={styles.card__content_paragraph} onClick={this.onClickeRead}>..Read More</p>
   {
    securedLinks
   } </div>
    </div>
  </div>
  <div className={this.state.isToggleOn ? styles.card_summary_active:styles.card_summary  }>
  <p className={styles.card__content_paragraph}>{extra.extraSummary}</p>
  </div>
   <div className={ this.state.isToggleOn ? styles.card_img: styles.card_img_active }>
   <img className={styles.card_img_top} src={extraImage2} alt="2"/>
   </div>
 <div className={ this.state.isToggleOn ? styles.card_img: styles.card_img_active }>
    <img className={styles.card_img_top} src={extraImage3} alt="3"/>
 </div>
  <div className={ this.state.isToggleOn ? styles.card_img: styles.card_img_active }>
  <img className={styles.card_img_top} src={extraImage4} alt="4"/>
  </div>
  </div>

</div>


        
        )
    }
}
ExtraItem.propTypes = {
    deleteExtra: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    security: state.security
})
export default connect(mapStateToProps, {deleteExtra})(ExtraItem)
