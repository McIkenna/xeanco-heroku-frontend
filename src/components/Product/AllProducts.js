import React, { Component } from 'react'
import styles from "./product.module.css"
import {Link} from "react-router-dom"
import { getAllProductTasks } from '../../actions/ProductActions'
import {connect} from "react-redux"
import PropTypes from "prop-types"

export class AllProducts extends Component {
    componentDidMount(){
        this.props.getAllProductTasks();
        
    }
    render() {
        const {all_products_tasks} = this.props.product_task;
        return (
            <div>
                <div className={styles.task_heading}>
                    <h1>PRODUCTS & SERVICES </h1>
                </div>
            <div className="container">
            <div className={styles.task_row}>
            {all_products_tasks.map(
                task => (
                    
        <div class={styles.task_col}>

        <img src={`data:image/jpeg;base64,${task.productTskImg}`} className={styles.task_image} alt="..."/>
        <div className="card-body">
            <h5 className={styles.card_title}>{task.productTskName}</h5>
        </div>
        </div>
 
    
                )
            )}    

            </div>
            </div>

            </div>
        )
    }
}
AllProducts.propTypes = {
    getAllProductTasks: PropTypes.func.isRequired,
    product_task: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    product_task: state.product_task

})

export default connect(mapStateToProps, {getAllProductTasks})(AllProducts)
