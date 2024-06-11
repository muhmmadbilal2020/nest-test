import { useState, useEffect } from 'react';
import { getCategories, getMoviesByCategory, rateMovie, getRecommendedMovies } from '../services/api';

interface Movie {
  id: string;
  title: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const MoviesList = ({ token }: { token: string }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [moviesByCategory, setMoviesByCategory] = useState<{ [key: string]: Movie[] }>({});
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        setError('Failed to fetch categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesByCat: { [key: string]: Movie[] } = {};
        for (const category of categories) {
          const movies = await getMoviesByCategory(category.id);
          moviesByCat[category.id] = movies;
        }
        setMoviesByCategory(moviesByCat);
      } catch (error) {
        console.error('Failed to fetch movies', error);
        setError('Failed to fetch movies.');
      }
    };
    if (categories.length > 0) {
      fetchMovies();
    }
  }, [categories]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const data = await getRecommendedMovies(token);
        // console.log(data)
        setRecommendedMovies(data.data);
      } catch (error) {
        console.error('Failed to fetch recommended movies', error);
        setError('Failed to fetch recommended movies.');
      }
    };
    fetchRecommendedMovies();
  }, [token]);

  const handleRateMovie = async (movieId: string, rating: number) => {
    try {
      await rateMovie(token, movieId, rating);
      alert('Rating submitted!');
    } catch (error) {
      console.error('Failed to rate movie', error);
      setError('Failed to rate movie.');
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <h2>Categories and Movies</h2>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {moviesByCategory[category.id]?.map(movie => (
              <li key={movie.id}>
                {movie.title}
                <button onClick={() => handleRateMovie(movie.id, 5)} className="btn btn-primary btn-xs my-1 mx-1">Rate 5</button>
                <button onClick={() => handleRateMovie(movie.id, 4)} className="btn btn-primary btn-xs my-1 mx-1">Rate 4</button>
                <button onClick={() => handleRateMovie(movie.id, 3)} className="btn btn-primary btn-xs my-1 mx-1">Rate 3</button>
                <button onClick={() => handleRateMovie(movie.id, 2)} className="btn btn-primary btn-xs my-1 mx-1">Rate 2</button>
                <button onClick={() => handleRateMovie(movie.id, 1)} className="btn btn-primary btn-xs my-1 mx-1">Rate 1</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Recommended Movies</h2>
      <ul>
        {Array.isArray(recommendedMovies) ? (
          recommendedMovies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))
        ) : (
          <li>No recommended movies available</li>
        )}
      </ul>

    </div>
  );
};

export default MoviesList;
