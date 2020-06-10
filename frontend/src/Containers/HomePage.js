import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';
import '../css/Homepage.css';
import Movie from '../Components/Movie';
import SearchBar from '../Components/SearchBar'
import { Link, Redirect } from "react-router-dom";

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userID:1,
            movieData:null,
            searchQuery:null,
            pageNumber:1,
            pageSection:0
        }
    }

   
    render(){

            return (
                <div>
                     
                    <SearchBar />

                    <div className="userFavouritesContainer">

                        <h1>hello world</h1>
                        <button onClick={this.getUserFavourites}></button>

                    </div>
                </div>

            )
          
        
    }
}

export default Homepage;

