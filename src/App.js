import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/MovieCard";
import ReviewForm from "./components/ReviewForm";
import Youtube from "react-youtube";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"; // Base URL for movie poster images
  const API_URL = "https://api.themoviedb.org/3"; // Base URL for TMDb API
  const MOCKAPI_URL = "https://645fc906fe8d6fb29e262195.mockapi.io/movie"; // Base URL for mock API
  const [movies, setMovies] = useState([]); // State variable for storing movie data
  const [selectedMovie, setSelectedMovie] = useState({}); // State variable for storing selected movie data
  const [searchKey, setSearchKey] = useState(""); // State variable for storing search keyword
  const [playTrailer, setPlayTrailer] = useState(false); // State variable for controlling trailer playback

  const fetchMovies = async (searchKey) => { // Function for fetching movies from TMDb API
    const type = searchKey ? "search" : "discover";
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY, // API key for accessing TMDb API
        query: searchKey
      }
    });

    setMovies(results); // Update movies state with fetched results
    await selectMovie(results[0]); // Select the first movie in the results
    console.log('data', results);
  };

  const fetchMovie = async (id) => { // Function for fetching detailed movie information
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY, // API key for accessing TMDb API
        append_to_response: "videos" // Include videos in the response
      }
    });

    return data; // Return the fetched movie data
  };

  const selectMovie = async (movie) => { // Function for selecting a movie
    setPlayTrailer(false); // Reset the playTrailer state variable
    const data = await fetchMovie(movie.id); // Fetch detailed information for the selected movie
    setSelectedMovie(data); // Update selectedMovie state with the fetched data
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when the component mounts
  }, []);

  const saveReview = async (review) => { // Function for saving a review for a movie
    try {
      await axios.post(`${MOCKAPI_URL}/${selectedMovie.id}/reviews`, review); // Save the review using the mock API
      const data = await fetchMovie(selectedMovie.id); // Fetch updated movie data
      setSelectedMovie(data); // Update selectedMovie state with the updated data
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const renderMovies = () => // Function for rendering movie cards and review forms
    movies.map((movie) => (
      <div key={movie.id}>
      <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />   {/*  Render a movie card component */}
        <ReviewForm selectedMovieId={selectedMovie.id} saveReview={saveReview} /> {/*  Render a review form component */}
      </div>
    ));

  const searchMovies = (e) => { // Function for handling movie search
    e.preventDefault();
    fetchMovies(searchKey); // Fetch movies based on the search keyword
  };

  const renderTrailer = () => { // Function for rendering the movie trailer
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;
    const opts = {
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0
      }
    };
    return (
      <div className="youtube-container">
        <Youtube videoId={key} opts={opts} />  {/*// Render the YouTube player component with the trailer video */}
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />  {/*Render the navigation bar component */}
        <header className={"header"}>
          <div className={"header-content max-center"}>
            <h2>Movie Review App</h2>
            <form onSubmit={searchMovies}>
              <input
                type="text"
                onChange={(e) => setSearchKey(e.target.value)} // Update the searchKey state as the input value changes
              />
              <button className="button" type="submit">
                Find Movie
              </button>
            </form>
          </div>
        </header>

        <div
          className="hero"
          style={{
            backgroundImage: `url('${
              selectedMovie.backdrop_path
                ? IMAGE_PATH + selectedMovie.backdrop_path
                : ""
            }')` // Set the background image of the hero section based on the selected movie's backdrop image
          }}
        >
          <div className="hero-content max-center">
            {playTrailer ? (
              <button className={"button"} onClick={() => setPlayTrailer(false)}>
                Close
              </button>
            ) : null}
            {selectedMovie.videos && playTrailer ? renderTrailer() : null} {/* // Render the trailer if available and playTrailer is true */}
            <button
              className={"button"}
              onClick={() => {
                setPlayTrailer(true); // Set playTrailer state to true to play the trailer
              }}
            >
              Play Trailer
            </button>
            <h1 className={"hero-title"}>{selectedMovie.title}</h1>
            {selectedMovie.overview ? (
              <p className={"hero-overview"}> {selectedMovie.overview} </p> // Render the movie overview
            ) : null}
          </div>
        </div>
         <div className="container max-center">{renderMovies()}</div> {/*// Render the movie cards and review forms */}
         <Footer /> {/*// Render the footer component */}
      </div>
    </Router>
  );
}

export default App;
