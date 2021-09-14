import React, { Component } from 'react'
import styles from "./product.module.css";
import {connect} from "react-redux";
import { getProductTask, updateProductTask } from '../../actions/ProductActions';
import PropTypes from "prop-types"

export class UpdateProductTask extends Component {

    constructor(props){
        super(props)
        this.state = {
        id: "",
        productIdentifier: "",
        productSequence: "",
        productTskName: "",
        productTskSummary: "",
        productTskDetail: "",
        productTskImg: "",
        productTskImgName: "",
        productTskImgType: "",
        productTskDownloadUrl: "",
        image_preview: "",
        file: null,
 

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
            productSequence,
            productTskName,
            productTskSummary,
            productTskDetail,
            productTskImg,
            productTskImgName,
            productTskImgType,
            productTskDownloadUrl,
            image_preview,
            file
        } = nextProps.product_task;

        this.setState({
            id,
            productIdentifier,
            productSequence,
            productTskName,
            productTskSummary,
            productTskDetail,
            productTskImg,
            productTskImgName,
            productTskImgType,
            productTskDownloadUrl,
            image_preview,
            file
        })
    }

    
   
    componentDidMount(){
        const {productlog_id, pt_id} = this.props.match.params;
        this.props.getProductTask(productlog_id, pt_id, this.props.history);
        
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
        const productTaskModel = new FormData();
        productTaskModel.append('id', this.state.id);
        productTaskModel.append('productIdentifier', this.state.productIdentifier);
        productTaskModel.append('productSequence', this.state.productSequence);
        productTaskModel.append('productTskName', this.state.productTskName);
        productTaskModel.append('productTskSummary', this.state.productTskSummary);
        productTaskModel.append('file', this.state.file);
        productTaskModel.append('productTskDetail', this.state.productTskDetail);
        
        this.props.updateProductTask(productTaskModel,this.state.productIdentifier, this.state.productSequence, this.props.history)


    }

    render() {
        const productTaskImage = `data:image/jpeg;base64,${this.state.productTskImg}`
        return (
            <div className={styles.formContainer}>
            <h1>Update Product Task</h1>
    <form className="row g-3" onSubmit={this.onSubmit}>

    <div className={styles.imgContainer}>
    <img src={productTaskImage} alt="..." className={styles.imgBox}/>
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

UpdateProductTask.propTypes = {
    updateProductTask: PropTypes.func.isRequired,
    getProductTask: PropTypes.func.isRequired,
    product_task: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    product_task: state.product_task.product_task
})

export default connect(mapStateToProps, {getProductTask, updateProductTask})(UpdateProductTask)
