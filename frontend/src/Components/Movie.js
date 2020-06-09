import React from "react";
import Button from 'react-bootstrap/Button';
import '../css/Movie.css'
import MovieModal from '../Components/MovieModal'
// import { AiOutlineSmile, IoMdSad, GiSadCrab } from 'react-icons/bs' //maybe?

class Movie extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            movieModalShow : false
        }
    }

    handleClickMovie = () => {
        // Click on movie for further information Modal
        this.setState({movieModalShow : true})
        // alert("Hello! I am an alert box!!");
    }

    handleClickMood = (e) => {
        let mood = e.target.value;
        let userID = this.props.userID;

        console.log(this.props.data)
        console.log(userID)
        console.log(mood)

        let toBeSent = {
            data : this.props.data,
            userID : userID,
            mood: mood
        }

        fetch('/favourites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(toBeSent) //works???
            
        })
        .then(
            alert(`${this.props.data.title} has been added to your ${mood} favourites`)
        )
        .catch(error => {
            console.log(error);
        })
        
    }

    render(){

        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ this.props.data.poster_path

        if(this.props.data.poster_path == null){
            url = "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png"
        }

        return (
          
                <div class="movieContainer">
                    <div class="movieClickableContainer" onClick={this.handleClickMovie}>
                        <h2>{this.props.data.title}</h2>
                        {/* <img src="/images/noPoster.png" />  */}
                        <img src = {url}/>
                    </div>
                    <div class="moodContainer">
                        <Button value="Happy" onClick={this.handleClickMood}>😀</Button>
                        <Button variant="primary" value="Sad" onClick={this.handleClickMood}>😥</Button>
                        <Button variant="primary" value="Bored" onClick={this.handleClickMood}>🥱</Button>
                    </div>

                    <MovieModal 
                show={this.state.movieModalShow}
                onHide={() => this.setState({movieModalShow : false})}
                data = {this.props.data}
                />

                </div>






        )
    }
}

export default Movie;