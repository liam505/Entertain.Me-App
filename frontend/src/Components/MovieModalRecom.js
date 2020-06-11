import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import '../css/MovieModal.css'

class MovieModalRecom extends React.Component {
    constructor(props){
        super(props);
    }


    handleClickMood = (e) => {
        let mood = e.target.value;
        let userID = this.props.userId;

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

    handleCloseClick = () => {
        this.props.onHide();
    }

    render(){
        console.log(this.props.data.original_title)
        if(this.props.data) {

        return (
            <Modal
                show = {this.props.show}
                size="1g">
                <div>
                    <Modal.Header>
                        <Modal.Title>
                            Movie Details
                        </Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <div className="top">
                            <div className="left">
                            <img src={"http://image.tmdb.org/t/p/w185/" + this.props.data.poster_path} alt='poster' />  
                            </div>
                            <div className="right">
                                <h1>{this.props.data.original_title}</h1>
                                <p>Average rating: {this.props.data.vote_average}</p>
                                <p>User rating count: {this.props.data.vote_count}</p>
                            </div>
                        </div>
                        <p>{this.props.data.overview}</p>
                        <div class="moodContainer">
                        <Button value="Happy" onClick={this.handleClickMood}>😀</Button>
                        <Button variant="primary" value="Sad" onClick={this.handleClickMood}>😥</Button>
                        <Button variant="primary" value="Bored" onClick={this.handleClickMood}>🥱</Button>
                        </div>

                            
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseClick} variant="secondary">
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
    return (
        <div>
          
        </div>
    )
}
}

export default MovieModalRecom;