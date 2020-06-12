import React from 'react';
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';
import '../css/NavBar.css';

class NavBar extends React.Component {

    a = <div className="navbar-btns" data-test="login_div">
            <form action="http://localhost:5000/login">
                <input className="btn btn-outline-success" type="submit" value="Sign In or Register" />
            </form>
        </div>
    b = <div className="navbar-btns" data-test="logout_div">
            <form action="http://localhost:5000/logout">
                <input className="btn btn-outline-danger" type="submit" value="Log Out" />
            </form>
            <button className="btn btn-outline-danger" onClick={this.props.deleteMyAccount}>
                Delete My Account
            </button>
        </div>;

    render() {
        console.log(this.props.userId)

        return(
            <div data-test="navbar_component">
                <Navbar className="navbar-bg" variant="dark">
                    <Navbar.Brand>
                        Entertain.me
                    </Navbar.Brand>
                    {this.props.userId ? this.b : this.a}  
                </Navbar>
            </div>
        )
        
    }

}

export default NavBar;


