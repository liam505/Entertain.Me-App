import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import '../css/Homepage.css';
import Movie from '../Components/Movie'

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movieData:null
        }
    }


    handleClickMovieSearch = (e) => {

        let key = "ca3b3298e0c4d85c79e20c33b747a10c"
        let search = "frozen"

        // fetch('localhost:5000/favourites', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({a: 1, b: 'Textual content'})
        // })

        console.log("Clicked")

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data =>{
            console.log(data.results) //testing
            this.setState({movieData : data.results})
        
        })
        .then(() => {
            fetch('/favourites', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.movieData)
            })
            .catch(error =>{
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleClickMovieGet = (e) => {

        console.log("Get movie clicked")

        fetch('/movie/1')
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })


    }


    render(){

        if(this.state.movieData){
            while((this.state.movieData).length > 10){
                this.state.movieData.pop();
            }
    
            return(
                <div className="movieContainer">
                    {this.state.movieData.map(data => <Movie userID = {1} data = {data}/>)}
                </div> 
            )
        }


        // if(this.state.movieData){
        //     return response
        // }
        
            return (
                <div>
                    <Button onClick={this.handleClickMovieSearch}/>
                    <Button onClick={this.handleClickMovieGet}/>
                </div>
            )
          
        
    }
}

export default Homepage;

