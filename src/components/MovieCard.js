import React from "react";

const MovieCard = ({movie, selectMovie}) => {
    // Define the URL for the movie image path
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

    // Render the movie card component
    return (
        <div className={"movie-card"} onClick={() => selectMovie(movie)}> {/* onClick to switch to the selected movie */}
            {/* Check if the movie has a poster path */}
            {movie.poster_path ? 
                // Render the movie cover image if a poster path exists
                <img className="movie-cover" src={`${IMAGE_PATH}${movie.poster_path}`} alt=""/>
                :
                // Render a placeholder if no image is found
                <div className="movie-placeholder">No Image found</div>
            }
            
            <h5 className="movie-title">{movie.title}</h5> {/* Render the movie title */}
        </div>
    );
};

export default MovieCard;
