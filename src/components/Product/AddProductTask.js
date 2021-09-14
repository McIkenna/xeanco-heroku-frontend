import React, { Component } from 'react'
import styles from "../Feature/feature.module.css";
import { createProductTask } from '../../actions/ProductActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';

export class AddProductTask extends Component {

    constructor(props){
        super(props)
        const {id} = this.props.match.params;
        this.state = {
        productIdentifier: id,
        productTskName: "",
        productTskSummary: "",
        productTskDetail: "",
        productTskImg: "",
        productTskImgName: "",
        productTskImgType: "",
        productTskDownloadUrl: "",
        image_preview: "",
        file: null,
        errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            productTskImgName : e.target.files[0].name
    
        })
        
    }

    onSubmit(e){
        e.preventDefault();
        const productTskModel = new FormData();
        productTskModel.append('file', this.state.file);
        productTskModel.append('productIdentifier', this.state.productIdentifier);
        productTskModel.append('productTskName', this.state.productTskName);
        productTskModel.append('productTskSummary', this.state.productTskSummary);
        productTskModel.append('productTskDetail', this.state.productTskDetail);
        
        this.props.createProductTask(productTskModel, this.state.productIdentifier, this.props.history)


    }


    render() {
        
        const {id} = this.props.match.params;
        return (
            <div className={styles.formContainer}>
                <Link to={`/productTask/${id}`} className="btn btn-outline-secondary me-2">Back</Link>
            <h1>New Product Task</h1>
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
            <label  className="form-label">Product Task Name</label>
            <input 
            type="text" 
            className="form-control" 
            name="productTskName"
            value={this.state.productTskName} 
            onChange={this.onChange}
            />
        </div>

        <div className="col-md-12">
            <label className="form-label">product Task Summary</label>
            <textarea 
            type="text" 
            className="form-control" 
            name="productTskSummary"
            value={this.state.productTskSummary} 
            onChange={this.onChange}

            />
        </div>  

        <div className="col-md-12">
            <label className="form-label">product Task Details</label>
            <textarea 
            type="text" 
            className="form-control" 
            name="productTskDetail"
            value={this.state.productTskDetail} 
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

AddProductTask.propTypes = {
    createProductTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
    
})

export default connect(mapStateToProps, {createProductTask})(AddProductTask)
