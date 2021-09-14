import React, { Component } from 'react'
import styles from "../Feature/feature.module.css";
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import { createIntro } from '../../actions/IntroActions';

export class AddIntro extends Component {
    constructor(props){
        super(props)
        this.state = {
        id: "",
        introName: "",
        introDescription: "",
        image: "",
        imageName: "",
        imageType: "",
        imageDownloadUrl: "",
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
            imageName : e.target.files[0].name
    
        })
        
    }

    onSubmit(e){
        e.preventDefault();
        const introModel = new FormData();
        introModel.append('file', this.state.file);
        introModel.append('introName', this.state.introName);
        introModel.append('introDescription', this.state.introDescription);        
        this.props.createIntro(introModel,this.props.history)


    }


    render() {
        
        return (
            <div className={styles.formContainer}>
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
            <label  className="form-label">Intro Name</label>
            <input 
            type="text" 
            className="form-control" 
            name="introName"
            value={this.state.introName} 
            onChange={this.onChange}
            />
        </div>

        <div className="col-md-12">
            <label className="form-label">Intro Details</label>
            <textarea 
            type="text" 
            className="form-control" 
            name="introDescription"
            value={this.state.introDescription} 
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

AddIntro.propTypes = {
    createIntro: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
    
})


export default connect(mapStateToProps, {createIntro})(AddIntro)
