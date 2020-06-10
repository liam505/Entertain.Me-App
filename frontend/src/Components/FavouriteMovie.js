import React from 'react'

class FavouriteMovie extends React.Component {

    constructor(props){
        super(props);
    }

    render () {

        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ this.props.data.image

        return (
            <div className="favouriteMovieContainer">
                <h1>{this.props.data.title}</h1>
                <img src = {url} alt={this.props.data.title}/>
            </div>
            
        )
    }


}

export default FavouriteMovie;