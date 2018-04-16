import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import fetch from 'node-fetch';
import {
    tryGetAPIConfig,
    tryGetMovieGenresList
} from './api/api-general';
import {
    tryGetMoviesForMainDirectory,
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
    tryGetLatestPersons,
    tryGetPersonDetailsById,
    tryGetPersonExternalLinksById,
    tryGetPersonImagesById,
    tryGetPersonMovieCreditsById,
    tryGetPersonsListByKeyword,
    tryGetPersonTaggedImagesById,
    tryGetPersonTvCreditsById,
    tryGetPopularPersons
} from './api/api-persons';
import {
    tryGenerateMovieGenresSitemap,
    tryGenerateMoviesSitemap,
    tryGenerateCelebsSitemap
} from './sitemap/sitemap';
import { processURL } from './ssr/bot-detect';

const PORT = process.env.PORT || 5001;
const app = express();
const router = express.Router();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Listen to Specified Port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

// Sitemap Files Location
app.get('/sitemap-movies-xml', (req, res) => {
    res.sendFile(path.join(__dirname, './movies-sitemap.xml'));
});
app.get('/sitemap-movie-genres-xml', (req, res) => {
    res.sendFile(path.join(__dirname, './movie-genres-sitemap.xml'));
});
app.get('/sitemap-celebs-xml', (req, res) => {
    res.sendFile(path.join(__dirname, './celebs-sitemap.xml'));
});

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
app.get('/sitemap-celebs', (req, res) => {
    const sitemap = tryGenerateCelebsSitemap(req, res);
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);
});

// Static robots.txt
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, './robots.txt'));
});

// TMDB API Endpoints
// General Endpoints
app.get('/get-api-config', tryGetAPIConfig);
app.get('/get-movie-genres', tryGetMovieGenresList);
// Movie Endpoints
// app.get('/advanced-movie-search/::', tryGetAdvancedSearchMovies);
// app.get('/get-movies-for-main-directory/:pageIndex', tryGetMoviesForMainDirectory);
app.get('/get-movies-for-main-directory/:pageIndex/:sortType', tryGetMoviesForMainDirectory);
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
// Persons Endpoints
app.get('/get-persons-by-keyword/:keyword/:pageIndex', tryGetPersonsListByKeyword);
app.get('/get-persons-popular/:pageIndex', tryGetPopularPersons);
app.get('/get-persons-latest', tryGetLatestPersons);
app.get('/get-person-details/:id', tryGetPersonDetailsById);
app.get('/get-person-movie-credits/:id', tryGetPersonMovieCreditsById);
app.get('/get-person-tv-credits/:id', tryGetPersonTvCreditsById);
app.get('/get-person-external-links/:id', tryGetPersonExternalLinksById);
app.get('/get-person-images/:id', tryGetPersonImagesById);
app.get('/get-person-tagged-images/:id/:pageIndex', tryGetPersonTaggedImagesById);
// All other endpoints will be processed by bot detector
app.get('**', processURL);
