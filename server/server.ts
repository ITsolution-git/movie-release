import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import * as FBAdmin from 'firebase-admin';
import {
    AD as admin,
    loadList,
    loadObject,
    loadValue,
    DB_LISTS
} from './firebase/firebase-config';
import {
    tryGetAPIConfig,
    tryGetMovieGenresList
} from './api/api-general';
import {
    tryGetAlternativeTitlesById,
    tryGetLatestMovies,
    tryGetMovieCreditsById,
    tryGetMovieDetailsById,
    tryGetMovieExternalLinksById,
    tryGetMovieImagesById,
    tryGetMovieKeywordsById,
    tryGetMovieReleaseDatesById,
    tryGetMovieReviewById,
    tryGetMoviesByCompanyId,
    tryGetMoviesListByGenreId,
    tryGetMoviesListByKeyword,
    tryGetMovieTranslationsById,
    tryGetMovieVideosById,
    tryGetNowPlayingMovies,
    tryGetPopularMovies,
    tryGetRecommendedMoviesById,
    tryGetSimilarMoviesById,
    tryGetTopRatedMovies,
    tryGetUpcomingMovies
} from './api/api-movies';
import {
    tryGenerateMovieGenresSitemap,
    tryGenerateMoviesSitemap
} from './sitemap/sitemap';
import { log } from 'util';

const PORT = process.env.PORT || 5001;
const app = express();
const router = express.Router();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'dist')));

const init = () => {
    console.log('Initialize');
};

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

// API Endpoints
// Sitemap Endpoints
app.get('/sitemap-movies', (req, res) => {
    const sitemap = tryGenerateMoviesSitemap(req, res);
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);
});
app.get('/sitemap-movie-genres', (req, res) => {
    const sitemap = tryGenerateMovieGenresSitemap(req, res);
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);
});

// General Endpoints
app.get('/get-api-config', tryGetAPIConfig);
app.get('/get-movie-genres', tryGetMovieGenresList);
// Movie Endpoints
// app.get('/advanced-movie-search/::', tryGetAdvancedSearchMovies);
app.get('/get-movies-by-keyword/:keyword/:pageIndex', tryGetMoviesListByKeyword);
app.get('/get-movies-by-genre/:id/:pageIndex', tryGetMoviesListByGenreId);
app.get('/get-movies-popular/:pageIndex', tryGetPopularMovies);
app.get('/get-movies-latest', tryGetLatestMovies);
app.get('/get-movies-top-rated/:pageIndex', tryGetTopRatedMovies);
app.get('/get-movies-upcoming/:pageIndex', tryGetUpcomingMovies);
app.get('/get-movies-now-playing/:pageIndex', tryGetNowPlayingMovies);
app.get('/get-movies-by-company/:id/:pageIndex', tryGetMoviesByCompanyId);
app.get('/get-movie/:id', tryGetMovieDetailsById);
app.get('/get-movie-credits/:id', tryGetMovieCreditsById);
app.get('/get-movie-reviews/:id/:pageIndex', tryGetMovieReviewById);
app.get('/get-movie-similar/:id/:pageIndex', tryGetSimilarMoviesById);
app.get('/get-movie-recommendations/:id/:pageIndex', tryGetRecommendedMoviesById);
app.get('/get-movie-videos/:id', tryGetMovieVideosById);
app.get('/get-movie-translations/:id', tryGetMovieTranslationsById);
app.get('/get-movie-keywords/:id', tryGetMovieKeywordsById);
app.get('/get-movie-release-dates/:id', tryGetMovieReleaseDatesById);
app.get('/get-movie-alt-titles/:id', tryGetAlternativeTitlesById);
app.get('/get-movie-external-links/:id', tryGetMovieExternalLinksById);
app.get('/get-movie-images/:id', tryGetMovieImagesById);
// All other endpoints redirect to App
app.get('**', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
