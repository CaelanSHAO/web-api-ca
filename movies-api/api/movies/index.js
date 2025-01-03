import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getMovieGenres,
    getPopularMovies,
    getMovieReviews
} from '../tmdb-api';

import Favorite from './favoriteModel.js';
import movies from '../../initialise-dev/movies.js';


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getMovieGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));



router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    try {
        const popularMovies = await getPopularMovies();
        res.status(200).json(popularMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));





//POST favorites
router.post('/favorites', asyncHandler(async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        const favorite = new Favorite({ userId, movieId });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

//get favorites from userId
router.get('/favorites/:userId', asyncHandler(async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.params.userId });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

//Get full movie information about the user's collection
router.get('/favorites/:userId/details', asyncHandler(async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.params.userId });
        const movieIds = favorites.map(fav => fav.movieId);
        const movies = await movieModel.find({ id: { $in: movieIds } });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

//Delete user's favorite movies
router.delete('/favorites/:userId/:movieId', asyncHandler(async (req, res) => {
    try {
        const { userId, movieId } = req.params;
        await Favorite.deleteOne({ userId, movieId });
        res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

//Add Movie to Watchlist
router.post('/watchlist', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.body;
    const watchlistItem = new Watchlist({ userId, movieId });
    await watchlistItem.save();
    res.status(201).json(watchlistItem);
}));

//Get the user's Watchlist
router.get('/watchlist/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const watchlist = await Watchlist.find({ userId });
    res.status(200).json(watchlist);
}));



export default router;
