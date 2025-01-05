import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { MoviesContext } from '../contexts/moviesContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(MoviesContext);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
