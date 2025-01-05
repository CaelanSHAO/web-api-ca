# Assignment 2 - Web API.

Name: Your Name

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + POST /api/movies/favorites: Add a movie to favorites.
 + GET /api/movies/favorites/:userId: Get all favorite movies for a specific user.
 + DELETE /api/movies/favorites/:userId/:movieId: Remove a movie from favorites. 
 + POST /api/movies/watchlist: Add a movie to the watchlist. 
 + GET /api/movies/watchlist/:userId: Get the user's watchlist.
 + DELETE /api/movies/watchlist/:userId/:movieId: Remove a movie from the watchlist.
 + GET /api/movies/tmdb/trending/:timeWindow: Get trending movies in a specified time window.
 + GET /api/movies/tmdb/genres: Fetch available movie genres.
 + GET /api/movies/tmdb/rating/:min-:max：Discover movies by rating range.
 + GET /api/movies/:id/reviews：Retrieve all reviews for a movie.
 + GET /api/movies/:id/recommendations：Retrieve recommended movies based on a specific movie.
 + GET /api/movies/actors/:id
 + GET /api/movies/tmdb/now-playing
 + GET /api/movies/tmdb/popular：Fetch popular movies.
  + Implemented user authentication using JWT to secure protected routes.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODE_ENV=production
PORT=3000
HOST=localhost
MONGO_DB=mongodb+srv://20108796:Sjy%24731278@tasky.caith.mongodb.net/tasky_db?
retryWrites=true&w=majority&ssl=false
TMDB_KEY=709a97bf7223e63f83799d708ffe605d
SECRET=ilikecake
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
- /api/movies/:id/recommendations | GET | Retrieve recommended movies based on a specific movie.
- /api/movies/tmdb/popular | GET | Fetch popular movies.
- /api/movies/tmdb/upcoming | GET | Fetch upcoming movies.
- /api/movies/tmdb/genres | GET | Fetch movie genres.
- /api/movies/tmdb/trending/:timeWindow | GET | Fetch trending movies by time window (day/week).
- /api/movies/tmdb/rating/:min-:max | GET | Discover movies by rating range.
- /api/movies/favorites | POST | 	Add a movie to the favorites list.
- /api/movies/favorites/:userId | GET | 	Retrieve favorite movies for a user.
- /api/movies/favorites/:userId/:movieId | DELETE | Remove a movie from the favorites
- /api/movies/favorites/:userId/details | GET | Retrieve detailed info for all favorites.
- /api/movies/watchlist | POST | Add a movie to the watchlist.
- /api/movies/watchlist/:userId | GET |:Retrieve the user's watchlist.
- /api/movies/watchlist/:userId/:movieId| DELETE |:Remove a movie from the watchlist.
- /api/movies/actors/:id	| GET | :Fetch details for a specific actor.


If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.
+ JWT is used for user authentication.
+ Tokens are generated upon successful login or registration.
+ The authenticate middleware verifies JWTs for protected routes.


+ Protected Routes:
+ POST /api/movies/favorites
 + GET /api/movies/favorites/:userId
 + DELETE /api/movies/favorites/:userId/:movieId
 + POST /api/movies/watchlist
 + GET /api/movies/watchlist/:userId
 + DELETE /api/movies/watchlist/:userId/:movieId
 + GET /api/movies/tmdb/trending/:timeWindow
 + GET /api/movies/tmdb/genres
 + GET /api/movies/:id/reviews
 + GET /api/movies/:id/recommendations
 + GET /api/movies/actors/:id
 + GET /api/movies/tmdb/now-playing
 + GET /api/movies/tmdb/popular
## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.  

+ JWT Authentication：Learned and implemented JWT to secure API endpoints and protect sensitive data.
+ MongoDB Collections: Added Favorites and Watchlist collections to store user-specific data.
+ Error Handling：Integrated robust error handling for both API and front-end operations, ensuring user-friendly error messages.
+ TMDB API Integration: Utilized TMDB API for fetching dynamic movie data, such as genres and trending movies.
