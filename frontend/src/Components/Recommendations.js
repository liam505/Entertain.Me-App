import React from 'react';
import movieRec from './movieRec';

class Recommendations extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: undefined
        }
    }



    componentDidMount () {
        if (this.props.id) {
            fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=ca3b3298e0c4d85c79e20c33b747a10c&language=en-US`)
            .then((response) => response.json())
            .then(result => this.setState({
                data: [result]
            }))
        }
    }

    
    // url = "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png"

   render () {
        if(this.state.data) {
            console.log(this.state.data)
            return(
                <div>
               { this.state.data.map(movie => <div><h1>{movie.original_title}</h1>  <img src={"http://image.tmdb.org/t/p/w185/" + movie.poster_path} alt='poster'></img></div>) }
                 </div> 
            )
        } 
            return(
                <div><h1>hi</h1></div>
            )
        }

    //    return(
    //      <div>
    //          <p>hey</p>
    //    {this.state.data !== [] ? this.state.data.map(movie => <movieRec movie={movie}/> ) : <h1>hey</h1>}
    //      </div>
    //    )
   


}

export default Recommendations;