import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';
import '../css/Homepage.css';
import Movie from '../Components/Movie';
import SearchBar from '../Components/SearchBar'
import { Link, Redirect } from "react-router-dom";
import FavouriteMovies from '../Components/FavouriteMovies';

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userID:1,
            movieData:false,
            searchQuery:null,
            pageNumber:1,
            pageSection:0,
            force : false,
        }
    }

    getUserFavourites = () => {

        this.setState({userID : 1})

        fetch(`/favourites/${this.state.userID}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    forceRender = () => {
        if(this.state.force === false){
            this.setState({force : true})
        }
        else{
            this.setState({force : false})
        }
    }

    movieDataExists = () => {
        this.setState({movieData : true})
    }



   
    render(){
  
            // if(this.state.movieData){
            //     console.log(this.state.movieData)
            //     console.log("MOVIE DATA")
            //     return(
            //         <SearchBar forceRender={this.forceRender} movieDataExists={this.movieDataExists}/>
            //     )
            // }
            // else {
            //     console.log(this.state.movieData)
            //     console.log(" NO MOVIE DATA")
            //     return (
            //         <div>
            //             <SearchBar forceRender={this.forceRender} movieDataExists={this.movieDataExists}/>
            //             <FavouriteMovies forceRender={this.forceRender}/>
            //         </div>
            //     )
            // }

            return (
                <div>
                    <SearchBar />
                    <FavouriteMovies />
                </div>
                    
            )

            

          
        
    }
}

export default Homepage;

