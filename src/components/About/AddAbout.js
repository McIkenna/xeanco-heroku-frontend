import React, { Component } from 'react';
import styles from "../Feature/feature.module.css";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { createAbout } from '../../actions/AboutActions';

export class AddAbout extends Component {
    constructor(){
        super()
        this.state={
            id: "",
            aboutName: "",
            aboutHeading: "",
            aboutSubHeading: "",
            aboutDescription: ""
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

    
    onSubmit(e){
        e.preventDefault();
        const newAbout = {
            id: this.state.id,
            aboutName: this.state.aboutName,
            aboutHeading: this.state.aboutHeading,
            aboutSubHeading: this.state.aboutSubHeading,
            aboutDescription: this.state.aboutDescription
        };

        this.props.createAbout(newAbout, this.props.history)
     
    }


    render() {
        return (
            <div className={styles.formContainer}>
                <h1>New Feature</h1>
    
        <form className="row g-3" onSubmit={this.onSubmit}>
           
            <div className="col-md-12">
                <label  className="form-label">About Name</label>
                <input 
                type="text" 
                className="form-control" 
                name="aboutName"
                value={this.state.aboutName} 
                onChange={this.onChange}
                />
            </div>
            <div className="col-md-12">
                <label className="form-label">About Heading</label>
                <textarea 
                type="text" 
                className="form-control" 
                name="aboutHeading"
                value={this.state.aboutHeading} 
                onChange={this.onChange}
                />
            </div>
            <div className="col-12">
                <label className="form-label">About Detals</label>
                <textarea 
                type="textarea" 
                className="form-control" 
                name="aboutDescription"
                value={this.state.aboutDescription} 
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

AddAbout.propTypes = {
    createAbout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(mapStateToProps, {createAbout})(AddAbout)
