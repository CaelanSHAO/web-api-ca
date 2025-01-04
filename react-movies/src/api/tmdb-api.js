import axios from 'axios';


export const getMovies = (args) => {
  const [, pagePart] = args.queryKey;
    const { page } = pagePart;
  return fetch(
    `/api/movies?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    console.error(`Failed to fetch movies: ${error.message}`);
    return { results: [], error: error.message }; 
  });
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch('/api/movies/tmdb/popular');
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const addFavoriteMovie = async (userId, movieId) => {
  try {
    const response = await fetch('/api/movies/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, movieId }),
    });
    if (!response.ok) {
      throw new Error('Failed to add favorite movie');
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getFavoriteMoviesDetails = async (userId) => {
  try {
    const response = await fetch(`/api/movies/favorites/${userId}/details`);
    if (!response.ok) {
      throw new Error('Failed to fetch favorite movies details');
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
  
export const getNowPlaying = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
    `/api/movies?page=${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getTrendingToday = ({ queryKey }) => {
  const [, {timeWindow}] = queryKey;
  console.log(queryKey);
  
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  


  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieRecommendations = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getUpcomingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    return fetch(
      `Y}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Failed to fetch movies: ${error.message}`);
      return { results: [], error: error.message }; 
    });
  };

  export const getPersonDetails = (personId) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${personId}?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=movie_credits`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  

  export const getMoviesByRating = ({queryKey}) => {
    const [, { rating }] = queryKey;
    const [min, max] = rating.split("-").map(Number);

    return fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "vote_average.gte=${min}&vote_average.lte=${max}&language=en-US&include_adult=false&include_video=false&page=1"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };