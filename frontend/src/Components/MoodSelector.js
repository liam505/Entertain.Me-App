import React from 'react';
import Button from 'react-bootstrap/Button';
import Recommendation from './Recommendation';
import Recommendations from './Recommendations';


class MoodSelector extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            feeling: null, 
            data: null
        }

        this.hasBeenClicked = this.hasBeenClicked.bind(this);
    }

    hasBeenClicked = (event) => {
        event.preventDefault();
        this.setState({
            feeling : event.target.value
        },() => this.getRecommendation())
    }

    getRecommendation = () => {
        fetch('/recomend/happy')
        .then(response => response.json())
        .then(response => this.setState( {data: response} ))
    }


    render() {
        return(
        <div>
            <h1>recommendations</h1>
            <div>
                <h2>How Are You Feeling Today?</h2>
                <button value="sad" onClick={this.hasBeenClicked}>Need Cheering Up</button>
                <button value="happy"onClick={this.hasBeenClicked}>Couldn't Be Better</button>
                <button value="bored" onClick={this.hasBeenClicked}>Bored</button>

                {this.state.data ? this.state.data.map(id => <Recommendations id={id} />) : null }
            </div>
        </div>
        )
    }

}

export default MoodSelector;