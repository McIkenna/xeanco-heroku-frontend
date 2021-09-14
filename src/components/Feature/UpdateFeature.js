import React, { Component } from 'react'
import { connect } from 'react-redux';
import classes from "./feature.module.css"
import { getFeature, updateFeature } from '../../actions/FeatureActions';
import PropTypes from "prop-types"
export class UpdateFeature extends Component {
    constructor(){
        super()
        this.state={
            featureId: "",
            featureIdentifier: "",
            featureHeading: "",
            featureSubHeading: "",
            featureDescription: "",
            featureImage : "",
            file: null,
            featureImageName:"",
            image_preview: '',
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
            featureId,
            featureIdentifier,
            featureHeading,
            featureSubHeading,
            featureDescription,
            featureImage,
            file,
            featureImageName,
            image_preview,
            errors
        } = nextProps.feature;

        this.setState({
            featureId,
            featureIdentifier,
            featureHeading,
            featureSubHeading,
            featureDescription,
            featureImage,
            file,
            featureImageName,
            image_preview,
            errors
        })
    }

    
   
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getFeature(id, this.props.history);
        
    }


    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    

    onSubmit(e){
        e.preventDefault();
        const updateFeatureModel = new FormData();
        updateFeatureModel.append('file', this.state.file);
        updateFeatureModel.append('featureHeading', this.state.featureHeading);
        updateFeatureModel.append('featureId', this.state.featureId);
        updateFeatureModel.append('featureSubHeading', this.state.featureSubHeading);
        updateFeatureModel.append('featureDescription', this.state.featureDescription);

        this.props.updateFeature(updateFeatureModel, this.props.history)


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
        const featureImage = `data:image/jpeg;base64,${this.state.featureImage}`

        return (
         
            <div className={classes.formContainer}>
                <h1>Updated Feature</h1>
                
        <form className="row g-3" onSubmit={this.onSubmit}>
        <div className={classes.imgContainer}>
        <img src={featureImage} alt="..." className={classes.imgBox}/>
        <img src={this.state.image_preview} alt="..." className={classes.imgBox}/>
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
                <label className="form-label">Details</label>
                <textarea 
                type="textarea" 
                className="form-control" 
                name="featureDescription"
                value={this.state.featureDescription} 
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

UpdateFeature.propTypes = {
    getFeature: PropTypes.func.isRequired,
    updateFeature: PropTypes.func.isRequired,
    feature: PropTypes.object.isRequired,
    //errors: PropTypes.object.isRequired

}

const mapStateToProps = state => 
({
    feature: state.feature.feature,
   // errors: state.errors
})

export default connect(mapStateToProps, {getFeature, updateFeature})(UpdateFeature)
