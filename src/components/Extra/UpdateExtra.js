import React, { Component } from 'react'
import styles from "../Feature/feature.module.css";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getExtra, createExtra } from '../../actions/ExtraAction';

export class UpdateExtra extends Component {

    constructor(props){
        super(props)
        this.state = {
        id: "",
        extraName: "",
        extraSummary: "",
        img1: "",
        imgName1: "",
        img2: "",
        imgName2: "",
        img3: "",
        imgName3: "",
        img4: "",
        imgName4: "",
        file1 : null,
        file2 : null,
        file3 : null,
        file4 : null,
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
        extraName,
        extraSummary,
        img1,
        imgName1,
        img2,
        imgName2,
        img3,
        imgName3,
        img4,
        imgName4,
        file1,
        file2,
        file3,
        file4
        
        } = nextProps.extra;

        this.setState({
            id,
            extraName,
            extraSummary,
            img1,
            imgName1,
            img2,
            imgName2,
            img3,
            imgName3,
            img4,
            imgName4,
            file1,
            file2,
            file3,
            file4
        })
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getExtra(id, this.props.history);
        
    }

    handleImagePreview1 = (e) => {
        this.setState({
            image_preview1: URL.createObjectURL(e.target.files[0]),
            file1 : e.target.files[0],
            imgName1 : e.target.files[0].name,
        

        })
    }
    handleImagePreview2 = (e) => {
        this.setState({
            image_preview2: URL.createObjectURL(e.target.files[0]),
            file2 : e.target.files[0],
            imgName2 : e.target.files[0].name

        })
    }
    handleImagePreview3 = (e) => {
        this.setState({
            image_preview3: URL.createObjectURL(e.target.files[0]),
            file3 : e.target.files[0],
            imgName3 : e.target.files[0].name

        })
    }
    handleImagePreview4 = (e) => {
        this.setState({
            image_preview4: URL.createObjectURL(e.target.files[0]),
            file4 : e.target.files[0],
            imgName4 : e.target.files[0].name

        })
    }

    
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    
    onSubmit(e){
        e.preventDefault();
        const extraModel = new FormData();
        extraModel.append('file1', this.state.file1);
        extraModel.append('file2', this.state.file2);
        extraModel.append('file3', this.state.file3);
        extraModel.append('file4', this.state.file4);
        extraModel.append('extraName', this.state.extraName);
        extraModel.append('extraSummary', this.state.extraSummary);    
        this.props.createExtra(extraModel,this.props.history)
    }

    render() {
        const introImg1 = `data:image/jpeg;base64,${this.state.img1}`
        const introImg2 = `data:image/jpeg;base64,${this.state.img2}`
        const introImg3 = `data:image/jpeg;base64,${this.state.img3}`
        const introImg4 = `data:image/jpeg;base64,${this.state.img4}`
        return (

            
            <div className={styles.formContainer}>
            <h1>Update Extras</h1>
    <form className="row g-3" onSubmit={this.onSubmit}>

    <div className={styles.imgContainer}>
    

    </div>
        <div className="mb-3">
        <img src={introImg1} alt="..." className={styles.imgBox}/>
        <img src={this.state.image_preview1}  alt="..." className={styles.imgBox}/>
        <input
         name="file1"
        type="file"
        id="file" 
        multiple
        onChange={this.handleImagePreview1}
        />
        </div>
        <div className="mb-3">
        <img src={introImg2} alt="..." className={styles.imgBox}/>
        <img src={this.state.image_preview2}  alt="..." className={styles.imgBox}/>
         <input
          name="file2"
        type="file"
        id="file" 
        multiple
        onChange={this.handleImagePreview2}
        />
        </div>
        <div className="mb-3">
        <img src={introImg3} alt="..." className={styles.imgBox}/>
        <img src={this.state.image_preview3}  alt="..." className={styles.imgBox}/>
         <input
          name="file3"
        type="file"
        id="file" 
        multiple
        onChange={this.handleImagePreview3}
        />
        </div>
        <div className="mb-3">
        <img src={introImg4} alt="..." className={styles.imgBox}/>
        <img src={this.state.image_preview4}  alt="..." className={styles.imgBox}/>
         <input
          name="file4"
        type="file"
        id="file" 
        multiple
        onChange={this.handleImagePreview4}
        />
        </div>

        <div className="col-md-12">
            <label  className="form-label">Extra Name</label>
            <input 
            type="text" 
            className="form-control" 
            name="extraName"
            value={this.state.extraName} 
            onChange={this.onChange}
            />
        </div>   
        <div className="col-md-12">
            <label className="form-label">Extra Summary</label>
            <textarea 
            type="text" 
            className="form-control" 
            name="extraSummary"
            value={this.state.extraSummary} 
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

UpdateExtra.propTypes = {
    getExtra: PropTypes.func.isRequired,
    createExtra: PropTypes.func.isRequired,
    extra: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    extra: state.extra.extra
})
export default connect(mapStateToProps, {getExtra, createExtra})(UpdateExtra)
