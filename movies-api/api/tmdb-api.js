import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch genres.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPopularMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch popular movies.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getNowPlayingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch now playing movies.');
        }

        return await response.json(); 
    } catch (error) {
        throw error; 
    }
};

export const getTrendingMovies = async (timeWindow) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch trending movies.');
        }

        return await response.json(); 
    } catch (error) {
        console.error('Failed to fetch trending movies:', error.message);
        throw error; 
    }
};

export const getMovieImagesFromTMDB = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Failed to fetch images for movie ID ${id}.`);
        }

        return await response.json(); 
    } catch (error) {
        console.error(`Failed to fetch images for movie ID ${id}:`, error.message);
        throw error; 
    }
};

export const getMovieRecommendationsFromTMDB = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Failed to fetch recommendations for movie ID ${id}.`);
        }

        return await response.json(); 
    } catch (error) {
        console.error(`Failed to fetch recommendations for movie ID ${id}:`, error.message);
        throw error; 
    }
};

export const getMovieReviewsFromTMDB = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

  export const getMovieDetailsFromTMDB = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Failed to fetch details for movie ID ${id}.`);
        }

        return await response.json(); 
    } catch (error) {
        console.error(`Failed to fetch details for movie ID ${id}:`, error.message);
        throw error; 
    }
};

export const getActorDetailsFromTMDB = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Failed to fetch details for actor ID ${id}.`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch details for actor ID ${id}:`, error.message);
        throw error;
    }
};

export const getMoviesByRating = async (min, max) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&vote_average.gte=${min}&vote_average.lte=${max}&language=en-US`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch movies by rating.');
    }
    return await response.json();
};

  
