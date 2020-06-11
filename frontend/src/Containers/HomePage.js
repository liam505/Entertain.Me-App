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

    // forceRender = () => 
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


      

    goBack = () => {
        this.setState({movieData : false})
    }

   
    render(){
  

            if(this.state.movieData){
                console.log(this.state.movieData)
                console.log("MOVIE DATA")
                return(
                    <div>

                        <SearchBar userId={this.props.userId} goBack={this.goBack} movieDataExists={this.movieDataExists}/>
                        
                    </div>
                    
                )
            }
            else {
                console.log(this.state.movieData)
                console.log(" NO MOVIE DATA")
                return (
                    <div className="d-flex flex-column h-70 align-items-center justify-content-center">
                        <SearchBar userId={this.props.userId} forceRender={this.forceRender} goBack={this.goBack} movieDataExists={this.movieDataExists}/>
                        {this.props.userId ? 
                            <div>
                                
                                <FavouriteMovies userId={this.props.userId}/>
                            </div>: 
                            <div className="h-100 w-100 d-flex flex-column bg-light align-items-center justify-content-between ">
                                <p className="mb-0 display-4">Search for your favourites films</p>
                                <div className="container w-50 d-flex flex-row align-items-center justify-content-around ">
                                    <img style={{ height:'200px', width:'133px'}} src="https://www.bestmovieposters.co.uk/wp-content/uploads/2019/01/4A8ltk8G.jpeg" />
                                    <img style={{ height:'200px', width:'133px'}} src="https://www.mauvais-genres.com/26247/avengers-endgame-original-movie-poster-15x21-in-2019-anthony-russo-robert-downey-jr.jpg" />
                                    <img style={{ height:'200px', width:'133px'}} src="https://images-na.ssl-images-amazon.com/images/I/41a0nad8wPL._AC_.jpg" />
                                </div>
                                <p className="display-3">↓</p>
                                <p className="display-4">Add them to mood-specific lists</p>
                                <div className="container w-50 d-flex flex-row align-items-center justify-content-around">
                                    <p className="display-1">😀</p>
                                    <p className="display-1">😥</p>
                                    <p className="display-1">🥱</p>
                                </div>
                                <p className="display-3">↓</p>
                                <p className="display-4">Get mood-matched personalised recommendations!</p>
                            </div>}
                    </div>

                )
            }

           
        
    }
}

export default Homepage;

