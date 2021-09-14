import React, { Component } from 'react'
import styles from "./contact.module.css"
import emailjs from "emailjs-com";
export class ContactUs extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: " ",
            message: "",
            nameError:"",
            emailError: "",
            messageError: "",
            feedback : null
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
   
        this.setState({ [event.target.name]: event.target.value });
    }

    validate =() => {
        let nameError = "";
        let emailError = "";

        
        if(!this.state.name){
            nameError = "name cannot be empty"
        }
        if(!this.state.message){
            let confirm = window.confirm("You are about to submit an empty file")
            if(confirm === true){
                return true;
            }
            else{
                return false
            }
        }
        if(nameError){
            this.setState({nameError});
            return false
        }
        return true;
    }

    onSubmit(event){
        event.preventDefault();
        const isValid = this.validate();
        if(isValid){
            emailjs.sendForm('gmail', 'template_atlctbc', event.target, 'user_GrMB7c02iEBfFNCUzpLWb')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            this.setState({
                name: "",
                email: "",
                message: "",
                nameError:"",
                emailError: "",
                messageError: "",
                feedback: "Successfully submitted!!"
              });
        }
           

    }

    render() {
        const {feedback} = this.state;
        return (
           
            <div className={styles.login_cover}>
            <div className="container">
                <div className="row">
                <div className="col-lg-6 col-sm-8">
                    <p className={styles.feedback}>{feedback}</p>
                    <h4> Contact Me</h4>
                    <hr />
                    <form onSubmit={this.onSubmit} className={styles.inner}>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Your Name"
                          name="name"
                          value = {this.state.name}
                          onChange={this.onChange}
                        />
                        <p className="is-invalid">{this.state.nameError}</p>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Email Address"
                          name="email"
                          value = {this.state.email}
                          onChange={this.onChange}
                        />
                        <p className="is-invalid">{this.state.emailError}</p>
                      </div>
                      <div className="form-group mb-3">
                        <textarea
                          type="textarea"
                          className="form-control form-control-lg"
                          placeholder="Your Message"
                          name="message"
                          value = {this.state.message}
                          onChange={this.onChange}
                        />
                        <p className="is-invalid">{this.state.messageError}</p>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                        
                      />
                    </form>
                  </div>
                  
<div className="col-lg-6 col-sm-4">
    <div className={styles.contact_into}>
    <h1>Address</h1>
    <p>HeadOffice : 101 Mal Tower, Al Nahda Dubai-UAE</p>
    <p>Branch : 004 Swissguard Plaza Ogui road Enugu, Nigeria</p>

    <h1>Phone</h1>
    <p>+971588568091</p>
    <p>+2347067663299</p>
    <h1>Email</h1>
    <p>xeancointernationalltd@gmail.com</p>
    </div>
</div>
<div>
<div>

    </div>
</div>
                </div>
              </div>
              </div>
         
        )
    }
}

export default ContactUs
