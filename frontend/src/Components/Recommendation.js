import React from 'react';
import Button from 'react-bootstrap/Button';

class Recommendation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount ()  {
        if (this.props.id) {
            this.getMovies()
        }
    }

    
    getMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/1579?api_key=ca3b3298e0c4d85c79e20c33b747a10c&language=en-US')
        .then(response => response.json())
        .then(result => this.setState({data : result}))
    }


    
    render(){
        
        return(

        <div>
            <p>hep</p>

            {this.state.data ? this.state.data.map(movie => <h1>{movie.original_title}</h1> ) : null}

        </div>

        )
    }

}

export default Recommendation;