import React, { Component } from 'react'
import styles from "../Feature/feature.module.css";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { createProduct } from '../../actions/ProductActions';




export class AddProduct extends Component {
    constructor(){
        super()
        this.state = {
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

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors){
            return {errors: nextProps.errors};
        }
        else return null;
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.error){
            this.setState({errors: prevProps.error})
        }
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
    
        this.setState({
            image_preview: image_as_base64,
            file : e.target.files[0],
            productImgName : e.target.files[0].name
    
        })
        
    }

    onSubmit(e){
        e.preventDefault();
        const productModel = new FormData();
        productModel.append('file', this.state.file);
        productModel.append('productName', this.state.productName);
        productModel.append('productSummary', this.state.productSummary);
        
        this.props.createProduct(productModel, this.props.history)


    }

    render() {
        return (
            <div className={styles.formContainer}>
            <h1>New Product</h1>
    <form className="row g-3" onSubmit={this.onSubmit}>

    <div className={styles.imgContainer}>
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

AddProduct.propTypes = {
    createProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
    
})

export default connect(mapStateToProps, {createProduct})(AddProduct)
