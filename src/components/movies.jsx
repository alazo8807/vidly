import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService.js";
import Like from "./like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  deleteMovieHandler = movieId => {
    deleteMovie(movieId);
    this.setState({ movies: getMovies() });
  };

  handleLike = movie => {
    const isLiked = !movie.liked;
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = isLiked;

    console.log("I did this");

    this.setState({ movies: movies });
  };

  renderMoviesTable() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;

    return (
      <div>
        <p>Showing {this.state.movies.length} in the database</p>
        {this.getMoviesTable()}
      </div>
    );
  }
  getMoviesTable() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th key={1}>Title</th>
              <th key={2}>Genre</th>
              <th key={3}>Stock</th>
              <th key={4}>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onLike={() => {
                        this.handleLike(movie);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        this.deleteMovieHandler(movie._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return (
      <main className="container">
        <div>
          <h1>Movies</h1>
          {this.renderMoviesTable()}
        </div>
      </main>
    );
  }
}

export default Movies;
