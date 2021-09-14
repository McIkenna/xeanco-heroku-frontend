import React, { Component } from 'react'
import ProductTask  from './ProductTask'
import { connect } from 'react-redux'
import { getProductTasks } from '../../actions/ProductActions'
import PropTypes from "prop-types"
import style from "./product.module.css"

export class ProductBoard extends Component {

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getProductTasks(id);
        
    }
    render() {
        let {product_tasks} = this.props.product_task;

      
        if(product_tasks.length < 1){
                return(
                    <div className="'alert alert-danger text-center" role="alert">
                            <p>No Product Item found</p>
                    </div>
                )
            }
            else{
                return (
                <div className={style.taskContainer}>
                {
                product_tasks.map(product_task => ( <ProductTask  key={product_task.id} product_task={product_task} />))
                }
               
            </div>
                )
            }
        };
    
}

ProductBoard.propTypes = {
    product_task: PropTypes.object.isRequired,
    getProductTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product_task: state.product_task   
})


export default connect(mapStateToProps, {getProductTasks})(ProductBoard)
