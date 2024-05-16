import { useState } from "react";
import "./MovieApp.css";

export const MovieApp = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie?";
  const API_KEY = 'b56c3072ea203b3c2070acc2fce09c82';

  const [search, setSearch] = useState('');
  const [moviesList, setMoviesList] = useState([]);

  const handleInputChange = ({target}) => {
    setSearch(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchMovies()
  }

  const fetchMovies = async() => {
    try{
        const response = await fetch(`${urlBase}query=${search}&api_key=${API_KEY}&language=es-ES`)
        const data = await response.json()
        setMoviesList(data.results)
    }
    catch(error){
        console.error(`Ha habido un error ${error}`)
    }
  }

  return (
    <>
      <div className="container">
        <h1>Buscador de Peliculas</h1>

        <form onSubmit={handleSubmit}>
          <input type="text"
           placeholder="Ingrese Pelicula"
           value={search}
           onChange={handleInputChange}
           />

          <button>Buscar</button>
        </form>

        {moviesList && 
            <div className="movie-list">
                {moviesList.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        }
      </div>
    </>
  );
};
