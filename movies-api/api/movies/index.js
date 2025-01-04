import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getMovieGenres,
    getPopularMovies,
    getNowPlayingMovies,
    getTrendingMovies,
    getMovieImagesFromTMDB,
    getMovieRecommendationsFromTMDB,
    getMovieReviewsFromTMDB,
    getMovieDetailsFromTMDB,
    getActorDetailsFromTMDB,

} from '../tmdb-api';

import Favorite from './favoriteModel.js';
import Watchlist from './watchlistModel.js';


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


// Get movie detail
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params; 
    try {
        const movieDetails = await getMovieDetailsFromTMDB(id); 
        res.status(200).json(movieDetails); 
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

router.get('/tmdb/now-playing', asyncHandler(async (req, res) => {
    try {
        const nowPlayingMovies = await getNowPlayingMovies(); 
        res.status(200).json(nowPlayingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));


router.get('/tmdb/trending/:timeWindow', asyncHandler(async (req, res) => {
    const { timeWindow } = req.params; 
    try {
        const trendingMovies = await getTrendingMovies(timeWindow); 
        res.status(200).json(trendingMovies); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}));


router.get('/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params; 
    try {
        const images = await getMovieImagesFromTMDB(id); 
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const { id } = req.params; 
    try {
        const recommendations = await getMovieRecommendationsFromTMDB(id); 
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}));


router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params; 
    try {
        const reviews = await getMovieReviewsFromTMDB(id); 
        res.status(200).json(reviews); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}));

router.get('/actors/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const actorDetails = await getActorDetailsFromTMDB(id);
        res.status(200).json(actorDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

router.get('/tmdb/rating/:min-:max', asyncHandler(async (req, res) => {
    const { min, max } = req.params;
    try {
        const movies = await getMoviesByRating(min, max); 
        res.status(200).json(movies);
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

//Remove movies from Watchlist
router.delete('/watchlist/:userId/:movieId', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.params;
    await Watchlist.deleteOne({ userId, movieId });
    res.status(200).json({ message: 'Movie removed from Watchlist' });
}));

export default router;
