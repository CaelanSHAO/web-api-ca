import React, { useState } from "react";
import { set } from "react-hook-form";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] );
  const [myReviews, setMyReviews] = useState( {} );
  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [user, setUser] = useState(null);
  const totalPages = 20;

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: "User" });
    }
  }, []);


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
      console.log(newFavorites)
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
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

  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };
  
  const addToWatchlist = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)){
      newWatchlist = [...watchlist, movie.id];
    }
    else{
      newWatchlist = [...watchlist];
    }
    setWatchlist(newWatchlist)
  };
  
  const removeFromWatchlist = (movie) => {
    setWatchlist( watchlist.filter(
      (mId) => mId !== movie.id
    ) )
  };



  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        addReview,
        page,
        handlePageChange,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;