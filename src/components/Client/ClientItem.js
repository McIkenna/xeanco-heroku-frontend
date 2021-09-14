import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { deleteClient } from '../../actions/ClientActions';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import styles from "./Client.module.css"
export class ClientItem extends Component {
    onDelete = id =>{
        this.props.deleteClient(id)
 }
    render() {
        const {client} = this.props;
        const {validToken, user} = this.props.security;

        const userIsAuthenticated = (
            <div>
            <Link to={`/updateClient/${client.id}`} className="btn btn-outline-secondary me-2" disabled>Update</Link>
    <button className="btn btn-danger" onClick={this.onDelete.bind(this, client.id)}>Delete</button>
   </div>)


        let securedLinks;

        if(validToken&&user){
            securedLinks = userIsAuthenticated;
        }else{
            securedLinks = "";
        }
        const clientImage = `data:image/jpeg;base64,${client.clientImg}`
        return (
    <div>
    <img className={styles.card_img_top} src={clientImage} alt="Card image cap"/>

    {securedLinks}
      </div>
   
        
        )
    }
}
ClientItem.propTypes = {
    deleteClient: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    security: state.security
})
export default connect(mapStateToProps, {deleteClient})(ClientItem)
