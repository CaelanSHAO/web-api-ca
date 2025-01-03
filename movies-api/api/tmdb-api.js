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




