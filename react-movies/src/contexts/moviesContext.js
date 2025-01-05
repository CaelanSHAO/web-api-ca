import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import {
  getPopularMovies,
  addFavoriteMovie,
  getFavoriteMoviesDetails,
} from "../api/tmdb-api";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [watchlist, setWatchlist] = useState([]);
 

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  
  const totalPages = 20;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: "User" });
    }
  }, []);
  
  const login = async (username, password) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setUser({ username });
        console.log("Login successful!");
      } else {
        console.error("Login failed:", data.msg);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    console.log("Logged out successfully!");
  };




  //   const addToFavorites = async (movie) => {
  //   try {
  //     const data = await addFavoriteMovie(userId, movie.id);
  //     setFavorites([...favorites, data]); 
  //     console.log('Added to favorites:', data);
  //   } catch (error) {
  //     console.error('Error adding to favorites:', error.message);
  //   }
  // };

  // const fetchFavoritesDetails = async () => {
  //   try {
  //     const data = await getFavoriteMoviesDetails(userId);
  //     setFavorites(data);
  //     console.log('Fetched favorite movies details:', data);
  //   } catch (error) {
  //     console.error('Error fetching favorite movies details:', error.message);
  //   }
  // };
  
  const fetchFavorites = async () => {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 Token

    const response = await fetch('/api/movies/favorites', {
        headers: {
            Authorization: token, // 在请求头中传递 Token
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Favorites:', data);
    } else {
        console.error('Failed to fetch favorites');
    }
};



  const handlePageChange = (event, value) => {
    if (value < 1 || value > totalPages) {
      console.error("Page out of bounds:", value);
      setPage(1);
      return;
    }
    console.log("Changing to page:", value);
    setPage(value);
  };


  // const removeFromFavorites = (movie) => {
  //   setFavorites(favorites.filter(
  //     (mId) => mId !== movie.id
  //   ))
  // };

  // const addToWatchlist = (movie) => {
  //   let newWatchlist = [];
  //   if (!watchlist.includes(movie.id)) {
  //     newWatchlist = [...watchlist, movie.id];
  //   }
  //   else {
  //     newWatchlist = [...watchlist];
  //   }
  //   setWatchlist(newWatchlist)
  // };

  // const removeFromWatchlist = (movie) => {
  //   setWatchlist(watchlist.filter(
  //     (mId) => mId !== movie.id
  //   ))
  // };



  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        // addToFavorites,
        // removeFromFavorites,
        // fetchFavoritesDetails,
        // watchlist,
        // addToWatchlist,
        // removeFromWatchlist,
        addReview,
        page,
        handlePageChange,
        isAuthenticated,
        user,
        login,
        logout

      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;