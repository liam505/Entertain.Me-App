import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';
import '../css/SearchBar.css';
import Movie from '../Components/Movie';
import { Link, Redirect } from "react-router-dom";

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movieData:null,
            searchQuery:null,
            pageNumber:1,
            pageSection:0
        }
    }

    handleClickMovieSearch = (e) => {

        let key = "ca3b3298e0c4d85c79e20c33b747a10c"

    
        console.log("Clicked")
        console.log(this.state.searchQuery)
        let search = this.state.searchQuery

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data =>{
            console.log(data.results) //testing
            this.setState({
                movieData : data.results,
                pageSection : 1
            })
            this.props.movieDataExists();
        
        })
        .catch(error => {
            console.log(error)
        })

        // this.props.movieDataExists();
        // this.props.forceRender();

    }

    handleClickNext = (e) => {
        if(this.state.pageSection == 1){
            this.setState({pageNumber : this.state.pageNumber + 1})
        }
        
        let key = "ca3b3298e0c4d85c79e20c33b747a10c"
        let search = this.state.searchQuery

        console.log(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=${this.state.pageNumber}&include_adult=false`)
    
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=${this.state.pageNumber}&include_adult=false`)
        .then(response => response.json())
        .then(data =>{
            console.log(data.results) //testing
            if(this.state.pageSection == 0){
                this.setState({
                    movieData : data.results,
                    pageSection : 1
                })

            }
            else{
                this.setState({
                    movieData : data.results,
                    pageSection : 0
                })
            }
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

    handleSearchChange = (e) => {
        let searchQuery = e.target.value;
        this.setState({searchQuery : searchQuery})
    }

    getUserFavourites = () => {

        fetch(`/favourites/${this.props.userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    login = (event) => {
        fetch('/login')
    }

    handleClickGoBack = () => {
        console.log("go back clicked")
        this.props.goBack();
        this.setState({movieData:null});
    }


    render() {

        if(this.state.movieData){
            if(this.state.pageSection == 1){
                while((this.state.movieData).length > 10){
                    this.state.movieData.pop();
                }
            }else{
                while((this.state.movieData).length > 10){
                    this.state.movieData.shift();
                }
            }
        }

            return(
                <div>
                    <div className="searchContainer">
                        <div className="searchBox">
                            <Form>
                                <input id="searchBar" onChange={this.handleSearchChange} type="text" placeholder="Search a movie"></input>
                                <Button onClick={this.handleClickMovieSearch}>🔍</Button>
                            </Form>
                        </div>

                        {this.state.movieData ? <div className="results-btn-container"><Button className="results-button" onClick={this.handleClickGoBack}>Favourites</Button><Button className="btn btn-success" onClick={this.handleClickNext}>Next Page</Button> </div>: null}
                        
                    </div>

                    {this.state.movieData ? <div className="moviesContainer">
                        {this.state.movieData.map(data => <Movie userId = {this.props.userId} data = {data}/>)}
                    </div> : null}
                    
                </div>
            )
        }
            
    
}

export default SearchBar;