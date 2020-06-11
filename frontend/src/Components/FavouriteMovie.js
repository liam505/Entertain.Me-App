import React from 'react'
import '../css/FavouriteMovie.css';
import Button from 'react-bootstrap/Button';

class FavouriteMovie extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            deleted : false
        }
    }


    handleClickRemoveFavourite = () => {
        let userID = this.props.userId;
        let movieID = this.props.data.movieID;

        console.log(movieID)

        let toBeSent = {
            userID : userID,
            movieID: movieID
        }
        
        fetch('/deletefavourites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(toBeSent)
        })
        .then(()=>{
            alert("fav deleted");
            if(this.state.deleted === false){
                this.setState({deleted : true})
            }
            else {
                this.setState({deleted : false})
            }
        })
        .then(() => {
            this.props.getUserFavourites();
        })
        .catch(error => {
            console.log(error)
        })

    }

    render () {

        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ this.props.data.image

        if(this.props.data.image == null){
            url = "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png"
        }

        return (
            <div className="favouriteMovieContainer">
                
                <img src = {url} alt={this.props.data.title}/>
                <div className="title">{this.props.data.title}</div>
                <Button variant="dark"onClick={this.handleClickRemoveFavourite}>Remove Favourite</Button>
            </div>
            
        )
    }


}

export default FavouriteMovie;