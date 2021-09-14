import React, { Component } from 'react';
import styles from "./feature.module.css";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { createFeature } from '../../actions/FeatureActions';

export class AddFeature extends Component {

    constructor(){
        super()
        this.state={
            featureIdentifier: "",
            featureHeading: "",
            featureSubHeading: "",
            featureDescription: "",
            featureImage : "",
            file: null,
            featureImageName:"",
            image_preview: "",
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

/*
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }
*/
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onSubmit(e){
        e.preventDefault();
        const featureModel = new FormData();
        featureModel.append('file', this.state.file);
        featureModel.append('featureHeading', this.state.featureHeading);
        featureModel.append('featureSubHeading', this.state.featureSubHeading);
        featureModel.append('featureDescription', this.state.featureDescription);

        this.props.createFeature(featureModel, this.props.history)


    }

    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
    
        this.setState({
            image_preview: image_as_base64,
            file : e.target.files[0],
            featureImageName : e.target.files[0].name
    
        })
        
    }


    render() {

        const {errors} = this.state;
        return (
         
            <div className={styles.formContainer}>
                <h1>New Feature</h1>
                <h1>{errors.error}</h1>
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
                <label  className="form-label">Heading</label>
                <input 
                type="text" 
                className="form-control" 
                name="featureHeading"
                value={this.state.featureHeading} 
                onChange={this.onChange}
                />
            </div>
            <p>{errors.featureHeading}</p>
            <div className="col-md-12">
                <label className="form-label">SubHeading</label>
                <textarea 
                type="text" 
                className="form-control" 
                name="featureSubHeading"
                value={this.state.featureSubHeading} 
                onChange={this.onChange}

                />
            </div>
            <div className="col-12">
                <label className="form-label">Detals</label>
                <textarea 
                type="textarea" 
                className="form-control" 
                name="featureDescription"
                value={this.state.featureDescription} 
                onChange={this.onChange}
                />
            </div> 
            <p>{errors.featureDescription}</p>       
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
            </div>
        )
    }
}

AddFeature.propTypes = {
    createFeature: PropTypes.func.isRequired,
    //errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(mapStateToProps, {createFeature})(AddFeature)
