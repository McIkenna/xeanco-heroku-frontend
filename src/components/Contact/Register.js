import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from "./contact.module.css"
import PropTypes from "prop-types"
import { createUser } from '../../actions/UserAction'
import classnames from "classnames"

export class Register extends Component {

    constructor(){
        super()
        this.state = {
            name : "",
            username : "",
            password : "",
            confirmPassword: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onSubmit(e){
        e.preventDefault();
        const newUser = {
            name : this.state.name,
            username : this.state.username,
            password : this.state.password,
            confirmPassword: this.state.confirmPassword,
      
        }
        this.props.createUser(newUser, this.props.history)

    }

    render() {

      const { errors } = this.state;
        return (
            
            <div className={styles.reg_cover}>
            <div className="container">
                <div className="row">
                <div className="col-md-6 col-sm-8"></div>
                <div className="col-md-6 col-sm-8">
                <div className={styles.reg_header}><h1>REGISTER NEW ADMIN</h1></div>
                   
                <form action="create-profile.html" onSubmit={this.onSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                     className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                
                  /> {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                     className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.username
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  /> {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                     className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  /> {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                     className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  /> {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
</div>     
            </div>
            </div>
            </div>
        )
    }
}

Register.propTypes ={
createUser: PropTypes.func.isRequired,
errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {createUser})(Register)
