import React, { Component } from 'react'
import styles from "./product.module.css";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { getProduct, updateProduct } from '../../actions/ProductActions';
export class UpdateProduct extends Component {
    constructor(){
        super()
        this.state = {
        id: "",
        productIdentifier: "",
        productName: "",
        productSummary: "",
        productImg: "",
        productImgName: "",
        productImgType: "",
        productDownloadUrl: "",
        image_preview: "",
        file: null,
        errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
        const {
            id,
            productIdentifier,
            productName,
            productSummary,
            productImg,
            productImgName,
            productImgType,
            productDownloadUrl,
            image_preview,
            file,
            errors
        } = nextProps.product;

        this.setState({
            id,
            productIdentifier,
            productName,
            productSummary,
            productImg,
            productImgName,
            productImgType,
            productDownloadUrl,
            image_preview,
            file,
            errors
        })
    }

    
   
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getProduct(id, this.props.history);
        
    }


    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onSubmit(e){
        e.preventDefault();
        const productModel = new FormData();
        productModel.append('file', this.state.file);
        productModel.append('productName', this.state.productName);
        productModel.append('id', this.state.id);
        productModel.append('productSummary', this.state.productSummary);
        
        this.props.updateProduct(productModel, this.props.history)


    }
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])

            this.setState({

                image_preview: image_as_base64,
                file : e.target.files[0],
                productImgName : e.target.files[0].name
            })
           
     }


    render() {
        const productImage = `data:image/jpeg;base64,${this.state.productImg}`
      
        
        return (
            <div className={styles.formContainer}>
            <h1>Update Product</h1>
    <form className="row g-3" onSubmit={this.onSubmit}>

    <div className={styles.imgContainer}>
    <img src={productImage} alt="..." className={styles.imgBox}/>
    <img src={this.state.image_preview} alt="..." className={styles.imgBox}/>
    </div>
        <div className="mb-3">
            
        <input
         name="file"
        type="file" 
      
        onChange={this.handleImagePreview}
        />
        </div>
        <div className="col-md-12">
            <label  className="form-label">Product Name</label>
            <input 
            type="text" 
            className="form-control" 
            name="productName"
            value={this.state.productName} 
            onChange={this.onChange}
            />
        </div>

        <div className="col-md-12">
            <label className="form-label">product Summary</label>
            <textarea 
            type="text" 
            className="form-control" 
            name="productSummary"
            value={this.state.productSummary} 
            onChange={this.onChange}

            />
        </div>     
        <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        </div>
        )
    }
}

UpdateProduct.propTypes ={
    getProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}
const mapStateToProps = state => ({

    product: state.product.product
})
export default connect(mapStateToProps, {getProduct, updateProduct})(UpdateProduct)
