import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap';
import '../css/Homepage.css';
import Movie from '../Components/Movie';
import SearchBar from '../Components/SearchBar'
import { Link, Redirect } from "react-router-dom";

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userID:1,
            movieData:null,
            searchQuery:null,
            pageNumber:1,
            pageSection:0
        }
    }

    // handleClickMovieSearch = (e) => {

    //     let key = "ca3b3298e0c4d85c79e20c33b747a10c"

    //     // fetch('localhost:5000/favourites', {
    //     //     method: 'POST',
    //     //     headers: {'Content-Type': 'application/json'},
    //     //     body: JSON.stringify({a: 1, b: 'Textual content'})
    //     // })

    //     console.log("Clicked")
    //     console.log(this.state.searchQuery)
    //     let search = this.state.searchQuery

    //     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=1&include_adult=false`)
    //     .then(response => response.json())
    //     .then(data =>{
    //         console.log(data.results) //testing
    //         this.setState({
    //             movieData : data.results,
    //             pageSection : 1
    //         })
        
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    // handleClickNext = (e) => {
    //     if(this.state.pageSection == 1){
    //         this.setState({pageNumber : this.state.pageNumber + 1})
    //     }
        
    //     let key = "ca3b3298e0c4d85c79e20c33b747a10c"
    //     let search = this.state.searchQuery

    //     console.log(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=${this.state.pageNumber}&include_adult=false`)
    
    //     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}&page=${this.state.pageNumber}&include_adult=false`)
    //     .then(response => response.json())
    //     .then(data =>{
    //         console.log(data.results) //testing
    //         if(this.state.pageSection == 0){
    //             this.setState({
    //                 movieData : data.results,
    //                 pageSection : 1
    //             })

    //         }
    //         else{
    //             this.setState({
    //                 movieData : data.results,
    //                 pageSection : 0
    //             })
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    // handleClickMovieGet = (e) => {

    //     console.log("Get movie clicked")

    //     fetch('/movie/1')
    //     .then(response =>{
    //         console.log(response)
    //     })
    //     .catch(error =>{
    //         console.log(error)
    //     })
    // }

    // handleSearchChange = (e) => {
    //     let searchQuery = e.target.value;
    //     this.setState({searchQuery : searchQuery})
    // }

    // getUserFavourites = () => {

    //     this.setState({userID : 1})

    //     fetch(`/favourites/${this.state.userID}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(error =>{
    //         console.log(error)
    //     })
    // }

    // login = (event) => {
    //     // event.p
    //     // console.log('LOGIN CLICKED')
    //     // // return <Redirect to='/https://127.0.0.1:5000/login' />
    //     // window.location.assign('/https://127.0.0.1:5000/login');
    //     // console.log(window.location)
    //     fetch('/login')
    // }


    render(){
        

        // if(this.state.movieData){
        //     if(this.state.pageSection == 1){
        //         while((this.state.movieData).length > 10){
        //             this.state.movieData.pop();
        //         }
        //     }else{
        //         while((this.state.movieData).length > 10){
        //             this.state.movieData.shift();
        //         }
        //     }

        //     return(
        //         <div>
                    
                
        //             <div className="searchContainer">
        //                 <div className="searchBox">
        //                     <Form>
        //                         <Form.Group onChange={this.handleSearchChange}>
        //                             <Form.Control id="searchBar" type="text" placeholder={"Enter a movie"} />
        //                             <Button onClick={this.handleClickMovieSearch}>🔍</Button>
        //                         </Form.Group>
        //                     </Form>
        //                 </div>

        //                 <Button onClick={this.handleClickNext}>Next Page</Button>
        //             </div>


        //             <div className="moviesContainer">
        //                 {this.state.movieData.map(data => <Movie userID = {1} data = {data}/>)}
        //             </div> 
        //         </div>
        //     )
        // }


        // if(this.state.movieData){
        //     return response
        // }

            return (
                <div>
                     {/* <div className="searchContainer">
                        <div className="searchBox">
                            <Form>
                                <Form.Group onChange={this.handleSearchChange}>
                                    <Form.Control id="searchBar" type="text" placeholder={"Enter a movie"} />
                                    <span>
                                        <Button onClick={this.handleClickMovieSearch}>🔍</Button>
                                    </span>
                                    
                                </Form.Group>
                            </Form>
                        </div>
                    </div> */}

                    <SearchBar />

                    <div className="userFavouritesContainer">

                        <h1>hello world</h1>
                        <button onClick={this.getUserFavourites}></button>

                    </div>
                </div>

            )
          
        
    }
}

export default Homepage;

