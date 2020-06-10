import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';
import '../css/Homepage.css';
import Movie from '../Components/Movie';
import SearchBar from '../Components/SearchBar'
import { Link, Redirect } from "react-router-dom";
import favouriteMovies from '../Components/favouriteMovies';
import MoodSelector from '../Components/MoodSelector';

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {

            userID:null,
            movieData:false,
            searchQuery:null,
            pageNumber:1,
            pageSection:0,
            force : false,
        }
    }

    getUserFavourites = () => {


        fetch(`/favourites/${this.props.userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    // forceRender = () => {
    //     console.log("FORCING RENDER MAIN")
    //     if(this.state.force === false){
    //         console.log("SET TRUE")
    //         this.setState({force : true})
    //     }
    //     else{
    //         console.log("SET FALSE")
    //         this.setState({force : false})
    //     }
    // }

    movieDataExists = () => {
        this.setState({movieData : true})
    }

   
    render(){
      
            if(this.state.movieData){
                console.log(this.state.movieData)
                console.log("MOVIE DATA")
                return(
                    <div>
                        <SearchBar userId={this.props.userId} movieDataExists={this.movieDataExists}/>
                    </div>
                    
                )
            }
            else {
                console.log(this.state.movieData)
                console.log(" NO MOVIE DATA")
                return (
                    <div>
                        <SearchBar userId={this.props.userId} forceRender={this.forceRender} movieDataExists={this.movieDataExists}/>
                        {this.props.userId ?
                            <MoodSelector />
                        : 
                        null}
                        
                    </div>
        
                )
            }

           
        
    }
}

export default Homepage;

