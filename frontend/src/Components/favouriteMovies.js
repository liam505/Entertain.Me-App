import React from 'react'
import FavouriteMovie from './FavouriteMovie'
import '../css/FavouriteMovies.css';
import Button from 'react-bootstrap/Button';
import MoodSelector from './MoodSelector';

class FavouriteMovies extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userMovieData:null,
            userMovieHappy:null,
            userMovieSad:null,
            userMovieBored:null,
            hasCalledAPI:false
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
                            userMovieBored : userMovieBored,
                            hasCalledAPI : true})
        })
        .catch(error =>{
            console.log(error)
        })


    }

    render () {
        console.log(this.state.userMovieHappy)

 
        if(this.state.userMovieHappy){
                console.log("rendered")
                return (
                 <div className="mood-section">
                    <div className="mood-selector">
                        <MoodSelector userId={this.props.userId}movieHappy={this.state.userMovieHappy} movieBored={this.state.userMovieBored} movieSad={this.state.userMovieSad} />
                    </div>
                    <div className="favouritesContainer">
                    <div className="moodSection">
                        <div className="moodTitle">
                            Happy 😀
                        </div>
                        <div className="moodSectionMovies">
                            {this.state.userMovieHappy.length == 0 ? <h1>No Happy moods</h1> : this.state.userMovieHappy.map(data => <FavouriteMovie userId={this.props.userId} getUserFavourites = {this.getUserFavourites} data = {data}/>)}
                        </div>
                        
                    </div>
                    <div className="moodSection">
                        <div className="moodTitle">
                           Sad 😥
                        </div>
                        <div className="moodSectionMovies">
                            {this.state.userMovieSad.length == 0 ? <h1>No Sad moods</h1> : this.state.userMovieSad.map(data => <FavouriteMovie userId={this.props.userId}  getUserFavourites = {this.getUserFavourites} data = {data}/>)}
                        </div>
                    </div>
                    <div className="moodSection">
                        <div className="moodTitle">
                            Bored 🥱
                        </div>
                        <div className="moodSectionMovies">
                            {this.state.userMovieBored.length == 0 ? <h1>No Bored moods</h1> :this.state.userMovieBored.map(data => <FavouriteMovie userId={this.props.userId} getUserFavourites = {this.getUserFavourites} data = {data}/>)}
                        </div>
                    </div>  
                    </div> 
                 </div>              
            )   
        }
        else{
            this.getUserFavourites();
            return(
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
    }

}

export default FavouriteMovies;
