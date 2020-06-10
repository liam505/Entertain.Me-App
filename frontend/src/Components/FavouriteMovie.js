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
            this.props.forceRender()
        })
        .catch(error => {
            console.log(error)
        })

    }


    render () {

        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ this.props.data.image

        return (
            <div className="favouriteMovieContainer">
                <h1>{this.props.data.title}</h1>
                <img src = {url} alt={this.props.data.title}/>
                <Button onClick={this.handleClickRemoveFavourite}>Remove Favourite</Button>
            </div>
            
        )
    }


}

export default FavouriteMovie;