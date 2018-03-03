"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const constants_1 = require("../constants");
// General API  Calls
// Get API configurations
const getAPIConfig = () => {
    // const url = 'https://api.themoviedb.org/3/configuration?api_key=3df8259258e7a30cb15e76ae75259892';
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
// Get the list of countries
const getCountriesList = () => {
    // const url = 'https://api.themoviedb.org/3/configuration/countries?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'configuration/countries' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetCountriesList = (req, res) => {
    getCountriesList()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get company details by company ID
const getCompanyDetailsById = (companyId) => {
    // const url = 'https://api.themoviedb.org/3/company/1?api_key=3df8259258e7a30cb15e76ae75259892';
    console.log(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'company/' + companyId + constants_1.TMDB_API_KEY);
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'company/' + companyId + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetCompanyDetailsById = (req, res) => {
    const id = req.params['id'];
    getCompanyDetailsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of jobs in movie industry
const getJobsList = () => {
    // const url = 'https://api.themoviedb.org/3/configuration/jobs?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'configuration/jobs' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetJobsList = (req, res) => {
    getJobsList()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of languages of movies
const getLanguagesList = () => {
    // const url = 'https://api.themoviedb.org/3/configuration/languages?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'configuration/languages' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetLanguagesList = (req, res) => {
    getLanguagesList()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movie certifications
const getMovieCertificationsList = () => {
    // const url = 'https://api.themoviedb.org/3/certification/movie/list?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'certification/movie/list' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetMovieCertificationsList = (req, res) => {
    getMovieCertificationsList()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movie genres
const getMovieGenresList = () => {
    // const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
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
// Get the list of tv show genres
const getTvShowGenresList = () => {
    // const url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'genre/tv/list' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowGenresList = (req, res) => {
    getTvShowGenresList()
        .then(result => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
