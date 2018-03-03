"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const constants_1 = require("../constants");
// General API  Calls
// Get API configurations
const getAPIConfig = () => {
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'configuration' + constants_1.TMDB_API_KEY, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                // console.log(chunk);
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const result_obj = JSON.parse(data);
                // console.log(result_obj);
                resolve(result_obj);
            });
        }).on('error', (err) => {
            console.log('Error: ' + err.message);
            reject(err);
        });
    });
};
exports.tryGetAPIConfig = (req, res) => {
    getAPIConfig()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movie genres
const getMovieGenresList = () => {
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'genre/movie/list' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                // console.log(chunk);
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const result_obj = JSON.parse(data);
                // console.log(result_obj);
                resolve(result_obj);
            });
        }).on('error', (err) => {
            console.log('Error: ' + err.message);
            reject(err);
        });
    });
};
exports.tryGetMovieGenresList = (req, res) => {
    getMovieGenresList()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
