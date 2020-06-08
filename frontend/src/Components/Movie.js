import React from "react";
import Button from 'react-bootstrap/Button';
import '../css/Movie.css'
// import { AiOutlineSmile, IoMdSad, GiSadCrab } from 'react-icons/bs' //maybe?

class Movie extends React.Component {



    constructor(props){
        super(props);

    }

    handleClickMovie = () => {
        // Click on movie for further information Modal
        alert("Hello! I am an alert box!!");
    }

    handleClickMood = (e) => {
        let mood = e.target.value;
        let userID = this.props.userID;

        // fetch('/favourites', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(this.props.movieData, userID, mood) //works???
        // })
        // .catch(error => {
        //     console.log(error);
        // })

        console.log(mood)
    }

    render(){

        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ this.props.data.poster_path 

        return (
            <div class="movieContainer" onClick={this.handleClickMovie}>
                <h1>{this.props.data.title}</h1>
                <img src = {`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.data.poster_path}`}/>
                <Button value="Happy" onClick={this.handleClickMood}> </Button>
                <Button variant="primary" value="Sad" onClick={this.handleClickMood}></Button>
                <Button variant="primary" value="Bored" onClick={this.handleClickMood}></Button>
            </div>
        )
    }
}

export default Movie;