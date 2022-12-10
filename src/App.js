import React, { useState, useEffect, useCallback } from "react";

import MovieList from "./components/MoviesList";
import "./App.css";
import AddMovieForm from "./components/AddMovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-project-afb03-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying");
      }
      const data = await response.json();
      console.log(data);
      const transformMovies = [];
      for (const key in data) {
        transformMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    
      const response = await fetch(
        "https://react-project-afb03-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      fetchMoviesHandler();
      console.log(data);
      
    }

    const deleteMovieHandler = async (id)  =>{
      console.log(id);
      
      const response = await fetch(
        `https://react-project-afb03-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method:'DELETE'
          
        }
      );
      fetchMoviesHandler();
      console.log(response);
    }
    
  

  let content = <p>No movies found</p>;
  if (movies.length > 0) {
    content = <MovieList movies={movies} onDeleteMovie={deleteMovieHandler}></MovieList>;
  }
  if (isLoading) {
    content = <p> loading ...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovieForm onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
