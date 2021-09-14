import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from "./contact.module.css"
import { login } from '../../actions/UserAction'
import PropTypes from "prop-types"
import classnames from "classnames"

export class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.security.validToken){
            this.props.history.push("/");
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
          }
    }

    onSubmit(e){
        e.preventDefault();
        const LoginRequest = {
            username : this.state.username,
            password : this.state.password,
        }
        this.props.login(LoginRequest, this.props.history)

    }
    render() {

        
        const { errors } = this.state;
        return (
            <div className={styles.login_cover}>
            <div className="container">
                <div className="row">
                <div className="col-lg-6 col-sm-8">
                <div className={styles.reg_header}><h1>LOGIN PAGE</h1></div>
                   
                <form action="create-profile.html" onSubmit={this.onSubmit}>
                
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
                  />
                         {errors.username && (
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
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
              </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
    </div>     
<div className="col-lg-6 col-sm-4"></div>
            </div> 
            </div>
            </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

    security: state.security,
    errors: state.errors
})
export default connect(mapStateToProps, {login})(Login)
