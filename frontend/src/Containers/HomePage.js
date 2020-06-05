import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import '../css/Homepage.css';

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginUsername:null,
            loginPassword:null,
            registrationUsername:null,
            registrationPassword:null
        }
    }

    handleChangeLoginUsername = (e) => {
        let loginUsername = e.target.value;
        this.setState({ loginUsername: loginUsername })
    }
    handleChangeLoginPassword = (e) => {
        let loginPassword = e.target.value;
        this.setState({ loginPassword: loginPassword })
    }

    handleChangeRegistrationUsername = (e) => {
        let registrationUsername = e.target.value;
        this.setState({ registrationUsername: registrationUsername })
    }
    handleChangeRegistrationPassword = (e) => {
        let registrationPassword = e.target.value;
        this.setState({  registrationPassword:  registrationPassword })
    }



    render(){
        return (

            <div>
                <div className="homepage-title">
                    <h1>"Homepage!"</h1>
                </div>
                

                <div className="loginFormDiv">
                    <h2>Login</h2>
                    <Form className="form">
                        <Form.Control required onChange={this.handleChangeLoginUsername} className="input" type="text" placeholder="Username"/>
                        <Form.Control required onChange={this.handleChangeLoginPassword} className="input" type="password" placeholder="Password"/>
                    </Form>
                    <div className="button-container">
                        <Button variant="primary" type="submit" id="login-btn" className="button"/>
                    </div>
                </div>

                <div className="registrationFormDiv">
                    <h2>Registration</h2>
                    <Form className="form">
                        <Form.Control required onChange={this.handleChangeRegistrationUsername} className="input" type="text" placeholder="Username"/>
                        <Form.Control required onChange={this.handleChangeRegistrationPassword} className="input" type="password" placeholder="Password"/>
                    </Form>
                    <div className="button-container">
                        <Button variant="primary" type="submit" id="login-btn" className="button"/>
                    </div>
                </div>

            </div>
            

        )
    }
}

export default Homepage;

