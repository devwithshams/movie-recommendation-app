import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieSearch from './components/Movie/MovieSearch';
import MovieDetails from './components/Movie/MovieDetails';
import Profile from './components/User/Profile';
import Watchlist from './components/User/Watchlist';
import Favorites from './components/User/Favorites';

const AppContent = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="bg-gray-800 text-white p-4 mb-4 rounded">
          <div className="flex justify-between">
            <div>
              <a href="/" className="text-lg font-bold">Movie App</a>
            </div>
            <div>
              {user ? (
                <>
                  <a href="/profile" className="mr-4">Profile</a>
                  <a href="/watchlist" className="mr-4">Watchlist</a>
                  <a href="/favorites" className="mr-4">Favorites</a>
                  <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                </>
              ) : (
                <>
                  <a href="/login" className="mr-4">Login</a>
                  <a href="/register">Register</a>
                </>
              )}
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies/:id" component={MovieDetails} />
          {user && (
            <>
              <Route path="/profile" component={Profile} />
              <Route path="/watchlist" component={Watchlist} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/" component={MovieSearch} />
            </>
          )}
          <Route path="/" component={MovieSearch} />
        </Switch>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;