import * as https from 'https';
import {
    TMDB_API_URL_ROOT,
    TMDB_API_KEY,
    TMDB_API_VER,
    TMDB_API_LANG,
    MAX_AGE
} from '../constants';

// General API  Calls
// Get API configurations
const getAPIConfig = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'configuration' + TMDB_API_KEY, (resp) => {
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
export const tryGetAPIConfig = (req, res) => {
    getAPIConfig()
        .then(result => {
            res.set("Cache-Control", "public, max-age="+MAX_AGE);
            res.set("Expires", new Date(Date.now() + MAX_AGE * 1000).toUTCString());
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Get the list of movie genres
const getMovieGenresList = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'genre/movie/list' + TMDB_API_KEY + TMDB_API_LANG, (resp) => {
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
export const tryGetMovieGenresList = (req, res) => {
    getMovieGenresList()
        .then(result => {
            res.set("Cache-Control", "public, max-age="+MAX_AGE);
            res.set("Expires", new Date(Date.now() + MAX_AGE * 1000).toUTCString());
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};
