import React, { Component } from 'react'
import style from "./product.module.css"
import {Link} from "react-router-dom"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { deleteProductTask } from '../../actions/ProductActions'
 

export class ProductTask extends Component {
  onDelete = (productlog_id, pt_id) =>{
    this.props.deleteProductTask(productlog_id, pt_id)
}
    render() {
      const {product_task} = this.props;
      const {validToken, user} = this.props.security;

      const userIsAuthenticated = (
          <div>
          <Link 
    to={`/updateProductTask/${product_task.productIdentifier}/${product_task.productSequence}`} 
    className="btn btn-outline-secondary me-2" disabled>Update</Link>
		<button className="btn btn-danger" onClick={this.onDelete.bind(this, product_task.productIdentifier, product_task.productSequence)}>Delete</button>
			 </div>)


      let securedLinks;

      if(validToken&&user){
          securedLinks = userIsAuthenticated;
      }else{
          securedLinks = "";
      }
      const productTaskImage = `data:image/jpeg;base64,${product_task.productTskImg}`
      
        return (
          <div className={style.card_container} >
          <div className={style.card} style={{maxWidth: "100%"}} >
          <div className={style.card_inner}>
            <div className={style.leftSide}>
        <img src={productTaskImage} alt="...."/>
          </div>
          <div className={style.rightSide}>
      <div className={style.card_body}>
          <h4 className={style.card_title}>{product_task.productTskName}</h4>
          <p className={style.card_paragraph} id={style.paragraph1}>{product_task.productTskSummary}</p><br />
          <p className={style.card_paragraph} id={style.paragraph2}>{product_task.productTskDetail}</p><br />
          
        </div>
   {securedLinks}
      </div>
</div>
</div>

</div>
           
        )
    }
}

ProductTask.propTypes = {
  deleteProductTask: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  security: state.security
})
export default connect(mapStateToProps, {deleteProductTask})(ProductTask)
