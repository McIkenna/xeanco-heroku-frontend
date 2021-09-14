import React, { Component } from 'react'
import styles from "../Feature/feature.module.css";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { createAbout, getAbout } from '../../actions/AboutActions';

export class UpdateAbout extends Component {
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

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
        const {
            id,
            aboutName,
            aboutHeading,
            aboutSubHeading,
            aboutDescription
        } = nextProps.about;

        this.setState({
            id,
            aboutName,
            aboutHeading,
            aboutSubHeading,
            aboutDescription
        })
    }
    
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getAbout(id, this.props.history);
        
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
                <h1>Update About</h1>
    
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

UpdateAbout.propTypes = {
    getAbout: PropTypes.func.isRequired,
    createAbout: PropTypes.func.isRequired,
    about: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    about: state.about.about
})

export default connect(mapStateToProps, {createAbout, getAbout})(UpdateAbout)
