"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const constants_1 = require("../constants");
// Get Movies for Homepage (Diccover)
const getMoviesForMainDirectory = (pageIndex, sortType) => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/discover/movie?api_key=a3dbd5ed599caf75f52b2c5e84bd4af3&language=en-US&region=US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2020';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        console.log('Server Calling Discover TMDB API:' + constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'discover/movie' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&region=US&sort_by=' + sortType + '&include_adult=false&include_video=false&page=' + pageIndex + '&primary_release_date.lte=2018-06-06');
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'discover/movie' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&region=US&sort_by=' + sortType + '&include_adult=false&include_video=false&page=' + pageIndex + '&primary_release_date.lte=2018-06-06', (resp) => {
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
exports.tryGetMoviesForMainDirectory = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    const sortType = req.params['sortType'];
    // console.log('Incoming Request Parameters: ', req.params);
    getMoviesForMainDirectory(pageIndex, sortType)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movies by search keyword (paginated) OK
const getMoviesListByKeyword = (keyword, pageIndex) => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/search/movie?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&query=gladiator&page=1&include_adult=false';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'search/movie' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&query=' + keyword + '&page=' + pageIndex + '&include_adult=false', (resp) => {
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
exports.tryGetMoviesListByKeyword = (req, res) => {
    const keyword = req.params['keyword'];
    const pageIndex = req.params['pageIndex'];
    getMoviesListByKeyword(keyword, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movies by genre ID (sorted) (pagination)
const getMoviesListByGenreId = (genreId, pageIndex) => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/discover/movie?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'discover/movie' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageIndex + '&with_genres=' + genreId, (resp) => {
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
exports.tryGetMoviesListByGenreId = (req, res) => {
    const genreId = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getMoviesListByGenreId(genreId, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get movie details by movie ID
const getMovieDetailsById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/555?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetMovieDetailsById = (req, res) => {
    const id = req.params['id'];
    getMovieDetailsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movie credits (cast) by movie ID
const getMovieCreditsById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/555/credits?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/credits' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetMovieCreditsById = (req, res) => {
    const id = req.params['id'];
    getMovieCreditsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movie reviews by movie ID (paginated)
const getMovieReviewById = (movieId, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/reviews?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/reviews' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetMovieReviewById = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getMovieReviewById(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of popular movies (paginated)
const getPopularMovies = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/movie/popular?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/popular' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex + '&region=US', (resp) => {
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
exports.tryGetPopularMovies = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getPopularMovies(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of latest movies
const getLatestMovies = () => {
    // const url = 'https://api.themoviedb.org/3/movie/latest?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/latest' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetLatestMovies = (req, res) => {
    getLatestMovies()
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of top rated movies (paginated)
const getTopRatedMovies = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/top_rated' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex + '&region=US', (resp) => {
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
exports.tryGetTopRatedMovies = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getTopRatedMovies(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of upcoming movies (paginated)
const getUpcomingMovies = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/upcoming' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex + '&region=US', (resp) => {
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
exports.tryGetUpcomingMovies = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getUpcomingMovies(pageIndex)
        .then((result) => {
        res.set("Cache-Control", "public, max-age=" + constants_1.MAX_AGE);
        res.set("Expires", new Date(Date.now() + constants_1.MAX_AGE * 1000).toUTCString());
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of now playing movies (paginated)
const getNowPlayingMovies = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/now_playing' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex + '&region=US', (resp) => {
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
exports.tryGetNowPlayingMovies = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getNowPlayingMovies(pageIndex)
        .then((result) => {
        res.set("Cache-Control", "public, max-age=" + constants_1.MAX_AGE);
        res.set("Expires", new Date(Date.now() + constants_1.MAX_AGE * 1000).toUTCString());
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movies by company ID
const getMoviesByCompanyId = (companyId, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/company/2/movies?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'company/' + companyId + '/movies' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetMoviesByCompanyId = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getMoviesByCompanyId(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of similar movies by movie ID (paginated)
const getSimilarMoviesById = (movieId, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/similar?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/similar' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetSimilarMoviesById = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getSimilarMoviesById(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of recommended movies by movie ID (paginated)
const getRecommendedMoviesById = (movieId, pageIndex) => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/movie/106646/recommendations?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/recommendations' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetRecommendedMoviesById = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getRecommendedMoviesById(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of videos by movie ID
const getMovieVideosById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/videos?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/videos' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetMovieVideosById = (req, res) => {
    const id = req.params['id'];
    getMovieVideosById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of translations of a movie by movie ID
const getMovieTranslationsById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/translations?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/translations' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetMovieTranslationsById = (req, res) => {
    const id = req.params['id'];
    getMovieTranslationsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the lis of release dates of a movie by movie ID
const getMovieReleaseDatesById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/release_dates?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/release_dates' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetMovieReleaseDatesById = (req, res) => {
    const id = req.params['id'];
    getMovieReleaseDatesById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of keywords of a movie by movie ID
const getMovieKeywordsById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/keywords?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/keywords' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetMovieKeywordsById = (req, res) => {
    const id = req.params['id'];
    getMovieKeywordsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of alternative titles of a movie by movie ID
const getAlternativeTitlesById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/alternative_titles?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/alternative_titles' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetAlternativeTitlesById = (req, res) => {
    const id = req.params['id'];
    getAlternativeTitlesById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get external links of a movie by movie ID
const getMovieExternalLinksById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/98/external_ids?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/external_ids' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetMovieExternalLinksById = (req, res) => {
    const id = req.params['id'];
    getMovieExternalLinksById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get movie images by movie ID
const getMovieImagesById = (movieId) => {
    // const url = 'https://api.themoviedb.org/3/movie/1734/images?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'movie/' + movieId + '/images' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetMovieImagesById = (req, res) => {
    const id = req.params['id'];
    getMovieImagesById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
