import React from 'react'
import FavouriteMovie from './FavouriteMovie'
import '../css/FavouriteMovies.css';
import Button from 'react-bootstrap/Button';

class FavouriteMovies extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userMovieData:null,
            userMovieHappy:null,
            userMovieSad:null,
            userMovieBored:null,
        }
    }

    getUserFavourites = () => {

        // this.setState({userID : 1})

        fetch(`/favourites/${this.props.userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({userMovieData : data})
        })
        .then(() => {
            let userMovieData = this.state.userMovieData
            let userMovieHappy = []
            let userMovieSad = []
            let userMovieBored = []

            userMovieData.forEach(function(movie){
                if(movie.mood === "Happy"){
                    console.log("Happy")
                    userMovieHappy.push(movie)
                }
                else if(movie.mood === "Sad"){
                    console.log("Sad")
                    userMovieSad.push(movie)
                }
                else{
                    console.log("Bored")
                    userMovieBored.push(movie)
                }
            })

            this.setState({userMovieHappy : userMovieHappy,
                            userMovieSad : userMovieSad,
                            userMovieBored : userMovieBored})
        })
        .catch(error =>{
            console.log(error)
        })


    }

    render () {

        if(this.state.userMovieHappy){
             return (
                 <div className="favouritesContainer">
                    <div className="moodSection">
                        <h1>Happy</h1>
                        <div className="moodSectionMovies">
                            {this.state.userMovieHappy.map(data => <FavouriteMovie userId={this.props.userId} getUserFavourites = {this.getUserFavourites} data = {data}/>)}
                        </div>
                        
                    </div>
                    <div className="moodSection">
                        <h1>Sad</h1>
                        <div className="moodSectionMovies">
                            {this.state.userMovieSad.map(data => <FavouriteMovie userId={this.props.userId}  getUserFavourites = {this.getUserFavourites} data = {data}/>)}
                        </div>
                    </div>
                    <div className="moodSection">
                        <h1>Bored</h1>
                        <div className="moodSectionMovies">
                            {this.state.userMovieBored.map(data => <FavouriteMovie userId={this.props.userId} getUserFavourites = {this.getUserFavourites} data = {data}/>)}
                        </div>
                    </div>   
                 </div>              
               
            )   
        }
        else{
            return(
                <div>
                    <h1>No favourites :(</h1>
                    <Button onClick={this.getUserFavourites}>Click for favourites</Button>

                </div>
            )
        }
    }

}

export default FavouriteMovies;