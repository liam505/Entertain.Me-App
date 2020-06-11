import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import '../css/MovieModal.css'

class MovieModal extends React.Component {
    constructor(props){
        super(props);
    }

    handleCloseClick = () => {
        this.props.onHide();
    }

    render(){

        let url = ("https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + this.props.data.poster_path);

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
                                <img id="image" src = {url}/>     
                            </div>
                            <div className="right">
                                <h1>{this.props.data.title}</h1>
                                <p>Average rating: {this.props.data.vote_average}</p>
                                <p>User rating count: {this.props.data.vote_count}</p>
                            </div>
                        </div>
                        <p>{this.props.data.overview}</p>
                        <div class="moodContainer">
                            <Button id="moodButton" variant="dark" onClick={this.props.handleClickMood}>😀</Button>
                            <Button id="moodButton" variant="dark" value="Sad" onClick={this.props.handleClickMood}>😥</Button>
                            <Button id="moodButton" variant="dark" value="Bored" onClick={this.props.handleClickMood}>🥱</Button>
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
}

export default MovieModal;