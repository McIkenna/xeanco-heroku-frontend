import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getIntro, updateIntro } from '../../actions/IntroActions';
import styles from "../Feature/feature.module.css";
import PropTypes from "prop-types"

export class UpdateIntro extends Component {
    constructor(){
        super()
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

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
        const {
            id,
            introName,
            introDescription,
            image,
            imageName,
            imageType,
            imageDownloadUrl,
            file,
        } = nextProps.intro;

        this.setState({
            id,
            introName,
            introDescription,
            image,
            imageName,
            imageType,
            imageDownloadUrl,
            file,
        })
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getIntro(id, this.props.history);
        
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
        introModel.append('id', this.state.id);
        introModel.append('file', this.state.file);
        introModel.append('introName', this.state.introName);
        introModel.append('introDescription', this.state.introDescription);        
        this.props.updateIntro(introModel,this.props.history)
    }


    render() {
        const introImg = `data:image/jpeg;base64,${this.state.image}`

        return (
            <div className={styles.formContainer}>
            <h1>Update Intro</h1>
    <form className="row g-3" onSubmit={this.onSubmit}>
    <div className={styles.imgContainer}>
    <img src={introImg} alt="..." className={styles.imgBox}/>
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

UpdateIntro.propTypes = {
    updateIntro: PropTypes.func.isRequired,
    getIntro: PropTypes.func.isRequired,
    intro: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    intro: state.intro.intro
    
})

export default connect(mapStateToProps, {updateIntro, getIntro})(UpdateIntro)
