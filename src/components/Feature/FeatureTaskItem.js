import React, { Component } from 'react'
import { getFeatureTask } from '../../actions/FeatureActions'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import styles from "./feature.module.css"

export class FeatureTaskItem extends Component {

    componentDidMount(){
        const {id} = this.props.match.params;
         this.props.getFeatureTask(id);
         //this.props.getFeatureTask();
     }
    render() {

        const {feature_task} = this.props.featureTask;
        const featureTaskImage = `data:image/jpeg;base64,${feature_task.image}`
      
        return (
            <div className={styles.taskContainer} >
                <div className={styles.header}>
            <h1 className={styles.headline}>{feature_task.headline}</h1>
            </div>
            <img src={featureTaskImage} className={styles.featureImg}  alt="..."/>  
      <p className={styles.summary}>{feature_task.summary}</p>
    </div>

        )
    }
}

FeatureTaskItem.propTypes = {
    featureTask: PropTypes.object.isRequired,
   getFeatureTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
 featureTask: state.featureTask
})

export default connect( mapStateToProps,{getFeatureTask})(FeatureTaskItem)
