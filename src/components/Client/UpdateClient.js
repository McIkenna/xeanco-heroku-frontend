import React, { Component } from 'react'
import { createClient, getClient } from '../../actions/ClientActions';
import styles from "../Feature/feature.module.css";
import {connect} from "react-redux"
import PropTypes from "prop-types"

export class UpdateClient extends Component {
constructor(){
    super()
    this.state = {
        id: "",
        clientName: "",
        clientImg: "",
        clientImageName: "",
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
        clientName,
        clientImg,
        clientImageName,
        file,
    } = nextProps.client;

    this.setState({
        id,
        clientName,
        clientImg,
        clientImageName,
        file,
    })
}
componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getClient(id, this.props.history);
    
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
        clientImageName : e.target.files[0].name

    })
    
}

onSubmit(e){
    e.preventDefault();
    const clientModel = new FormData();
    clientModel.append('id', this.state.id);
    clientModel.append('file', this.state.file);
    clientModel.append('clientName', this.state.clientName);      
    this.props.createClient(clientModel,this.props.history)
}


render() {
    const clientImage = `data:image/jpeg;base64,${this.state.clientImg}`

    return (
        <div className={styles.formContainer}>
        <h1>Update Client</h1>
<form className="row g-3" onSubmit={this.onSubmit}>
<div className={styles.imgContainer}>
<img src={clientImage} alt="..." className={styles.imgBox}/>
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
        <label  className="form-label">Client Name</label>
        <input 
        type="text" 
        className="form-control" 
        name="clientName"
        value={this.state.clientName} 
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

UpdateClient.propTypes = {
    createClient: PropTypes.func.isRequired,
    getClient: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
client: state.client.client

})

export default connect(mapStateToProps, {createClient, getClient})(UpdateClient)
