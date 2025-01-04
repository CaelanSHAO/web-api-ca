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



export const getNowPlaying = () => {
  return fetch(
    `/api/movies/tmdb/now-playing`
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
  const [, { timeWindow }] = queryKey;
  console.log(queryKey);

  return fetch(
    `/api/movies/tmdb/trending/${timeWindow}`
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



export const getGenres = () => {
  return fetch(
    `/api/movies/tmdb/genres`
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


export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}/images`
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

export const getMovieRecommendations = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}/recommendations`
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

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}/reviews`
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

export const getUpcomingMovies = async (args) => {
  const [, pagePart] = args.queryKey; 
  const { page } = pagePart;

  return fetch(`/api/movies/tmdb/upcoming?page=${page}`) 
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Failed to fetch upcoming movies: ${error.message}`);
      return { results: [], error: error.message };
    });
};


export const getActorDetails = ({ queryKey }) => {
  if (!Array.isArray(queryKey) || queryKey.length < 2 || !queryKey[1]) {
    throw new Error("Invalid queryKey. It must be an array with an ID object.");
  }

  const [, idPart] = queryKey;
  const { id } = idPart;

  if (!id) {
    throw new Error("Actor ID is undefined. Please provide a valid actor ID.");
  }

  return fetch(`/api/movies/actors/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Failed to fetch actor details.");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Failed to fetch actor details for ID ${id}: ${error.message}`);
      throw error;
    });
};




export const getMoviesByRating = ({ queryKey }) => {
  const [, { rating }] = queryKey;
  const [min, max] = rating.split("-").map(Number);

  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    process.env.REACT_APP_TMDB_KEY +
    "vote_average.gte=${min}&vote_average.lte=${max}&language=en-US&include_adult=false&include_video=false&page=1"
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

export const getMovieDetails = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  if (!id) {
    throw new Error("Movie ID is undefined. Please provide a valid movie ID.");
  }

  return fetch(`/api/movies/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Failed to fetch movie details.");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Failed to fetch movie details for ID ${id}: ${error.message}`);
      throw error;
    });
};

