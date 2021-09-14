import React, { Component } from 'react'
import styles from "./product.module.css"
import {Link} from "react-router-dom"
import { deleteProduct } from '../../actions/ProductActions'
import {connect} from "react-redux"
import PropTypes from "prop-types"
export class ProductItem extends Component {
    onDelete = id =>{
        this.props.deleteProduct(id)
 }

    render() {
        const {product} = this.props;
		const {validToken, user} = this.props.security;

        const userIsAuthenticated = (
            <div>
            <Link to={`/addProductTask/${product.productIdentifier}`} className="btn btn-outline-secondary me-2" disabled>Add Task</Link>
               <Link to={`/updateProduct/${product.productIdentifier}`} className="btn btn-outline-secondary me-2" disabled>Update</Link>
			   <button className="btn btn-danger" onClick={this.onDelete.bind(this, product.productIdentifier)}>Delete</button>
			   </div>)


        let securedLinks;

        if(validToken&&user){
            securedLinks = userIsAuthenticated;
        }else{
            securedLinks = "";
        }
        const productImage = `data:image/jpeg;base64,${product.productImg}`
        return (
		<div className={styles.poster_container}>
		<div className={styles.poster}>
			
		<div className={styles.poster_text}>
			<Link to={`/productBoard/${product.productIdentifier}`}  
			style={{ textDecoration: 'none'}}
			>
				<h1 className={styles.poster_title} >{product.productName}</h1>   
            </Link>				
				<div className={styles.poster_summary}>{product.productSummary}</div>
				<ul className={styles.postcard__tagbox}>
					{
					securedLinks
					}
					</ul>
			</div>

			<div  className={styles.poster_img}>
			<Link className={styles.postcard__img_link} to={`/productBoard/${product.productIdentifier}`}
			>
			<img className={styles.postcard__img} src={productImage} alt="Image Title" />
			</Link>
			</div>
		</div>
     
	</div>

        )
    }
}

ProductItem.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps, {deleteProduct})(ProductItem)
