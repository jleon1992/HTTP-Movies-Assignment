import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieForm from "./Movies/MovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const {push} = useHistory()
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const updateMovieList = (updatedMovie) => {
    
  }

  const putMovie = (id, newMovie) => {
    axios.put(`http://localhost:5000/api/movies/${id}`, newMovie)
    .then(res => {
      
      console.log(movieList)
      push('/')
      getMovieList()
    })
  }

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>
      <Route path="/update-movie/:id">
        <MovieForm putMovie={putMovie} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
