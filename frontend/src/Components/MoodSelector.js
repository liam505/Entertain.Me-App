import React from 'react';
import Button from 'react-bootstrap/Button';
import Recommendations from './Recommendations';
import '../css/MoodSelector.css'


class MoodSelector extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            feeling: null, 
            data: null,
            clicked: false
        }

        this.hasBeenClicked = this.hasBeenClicked.bind(this);
    }

    hasBeenClicked = (event) => {
        event.preventDefault();
        this.setState({
            feeling : event.target.value,
            data: null
        },() => this.getRecommendation())
    }

    getRecommendation = () => {
        console.log(this.state.feeling)
        fetch(`/recomend/${this.state.feeling}`)
        .then(response => response.json())
        .then(response => this.setState( {data: response} ))
    }


    render() {
        return(
        <div>
            <div className="recommendation-section">
                <h2>How Are You Feeling Today?</h2>
                <div className="div-buttons">
                    <div classname='mood-button'>
                    { this.props.movieHappy.length == 0 ? null : <div className="moods-b"> <button value="Happy"onClick={this.hasBeenClicked}>Couldn't Be Better</button> </div>}
                    </div>
                    <div classname='mood-button'>
                    { this.props.movieSad.length == 0 ? null : <div className="moods-b"> <button value="Sad" onClick={this.hasBeenClicked}>Need Cheering Up</button> </div> }
                    </div>
                    <div classname='mood-button'>
                    { this.props.movieBored.length == 0 ? null : <div className="moods-b"><button value="Bored" onClick={this.hasBeenClicked}>Bored</button></div>}
                    </div>
                </div>
                
                
                

                <div className="recommended">
                   {this.state.data ? this.state.data.map(id => <Recommendations clicked={this.state.clicked} userId={this.props.userId} id={id} />) : null }
                </div>
            </div>
        </div>
        )
    }

}

export default MoodSelector;