# Movie Recommendation App

A professional full-stack movie recommendation platform built with React, Express.js, MongoDB, and TMDB API.

## Setup

1. **Prerequisites**:
   - Node.js >= 14.0.0
   - npm >= 6.0.0
   - MongoDB Atlas account
   - TMDB API key

2. **Frontend**:
   - Navigate to `client/`
   - Run `npm install`
   - Create `.env` with `REACT_APP_API_URL=http://localhost:5000`
   - Update `src/constants.js` with your TMDB API key
   - Run `npm start`

3. **Backend**:
   - Navigate to `server/`
   - Run `npm install`
   - Create `.env` with `MONGO_URI`, `JWT_SECRET`, `TMDB_API_KEY`, and `PORT=5000`
   - Run `npm start`

4. **Deployment**:
   - **Frontend**: Deploy to Vercel using `vercel.json`. Push `client/` to a GitHub repository and link to Vercel.
   - **Backend**: Deploy to Render using `render.yaml`. Configure environment variables in Render dashboard.
   - **CI/CD**: Link GitHub repository to Vercel/Render for automatic deployments.

## Features
- User authentication with JWT and secure password hashing
- Movie search by title, genre, year, rating, and popularity
- Detailed movie pages with trailers and user reviews
- User features: favorites, watchlists, profile management, ratings/reviews
- Responsive design with Tailwind CSS
- Basic recommendations via TMDB popular movies

## Notes
- Replace `your_mongodb_connection_string`, `your_jwt_secret`, and `your_tmdb_api_key` in `server/.env` and `client/src/constants.js`.
- Run `npm audit fix` in both `client/` and `server/` to address vulnerabilities.
- For production, secure `JWT_SECRET` and use HTTPS.