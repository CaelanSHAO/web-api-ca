import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingTodayPage from "./pages/trendingTodayPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import MovieDetails from './pages/movieDetailsPage';
import PersonDetailsPage from "./pages/PersonDetailsPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import WatchlistMoviesPage from "./pages/watchlistMoviesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <MoviesContextProvider>
            <SiteHeader />
            <Routes>

              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />


              {/* Protected Routes */}
              <Route
                path="/movies/favorites"
                element={<PrivateRoute element={<FavoriteMoviesPage />} />}
              />
              <Route
                path="/movies/upcoming"
                element={<PrivateRoute element={<UpcomingMoviesPage />} />}
              />
              <Route
                path="/movies/trending/:timeWindow"
                element={<PrivateRoute element={<TrendingTodayPage />} />}
              />
              <Route
                path="/movie/now_playing"
                element={<PrivateRoute element={<NowPlayingPage />} />}
              />
              <Route
                path="/person/:personId"
                element={<PrivateRoute element={<PersonDetailsPage />} />}
              />
              <Route
                path="/movies/watchlist"
                element={<PrivateRoute element={<WatchlistMoviesPage />} />}
              />


            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};



const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);