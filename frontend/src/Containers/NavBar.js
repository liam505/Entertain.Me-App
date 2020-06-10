import React from 'react';
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';

class NavBar extends React.Component {
    render() {
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                        Entertain.me
                    </Navbar.Brand>
                    <Navbar.Text><a href="https://127.0.0.1:5000/login">Sign In or Register</a></Navbar.Text>            
                </Navbar>
            </div>
        )
        
    }

}

export default NavBar;


