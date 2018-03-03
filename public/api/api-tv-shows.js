"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const constants_1 = require("../constants");
// TV Shows API Calls
// Get the list of movies by search keyword (paginated) OK
const getTvShowsListByKeyword = (keyword, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/search/tv?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&query=tudor&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'search/tv' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&query=' + keyword + '&page=' + pageIndex, (resp) => {
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
exports.tryGetTvShowsListByKeyword = (req, res) => {
    const keyword = req.params['keyword'];
    const pageIndex = req.params['pageIndex'];
    getTvShowsListByKeyword(keyword, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of movies by genre ID (sorted)
const getTvShowsListByGenreId = (genreId, pageIndex) => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/discover/tv?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=35&include_null_first_air_dates=false';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'discover/tv' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&sort_by=popularity.desc&page=' + pageIndex + '&timezone=America%2FNew_York&with_genres=' + genreId + '&include_null_first_air_dates=false', (resp) => {
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
exports.tryGetTvShowsListByGenreId = (req, res) => {
    const genreId = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getTvShowsListByGenreId(genreId, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of latest tv shows
const getLatestTvShows = () => {
    // const url = 'https://api.themoviedb.org/3/tv/latest?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/latest' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetLatestTvShows = (req, res) => {
    getLatestTvShows()
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of popular tv shows (paginated)
const getPopularTvShows = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/tv/popular?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/popular' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetPopularTvShows = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getPopularTvShows(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of top rated tv shows (paginated)
const getTopRatedTvShows = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/top_rated' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetTopRatedTvShows = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getTopRatedTvShows(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of tv shows airing today Eastern Time UTC-05:00 (paginated)
const getTvShowsAiringToday = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/tv/airing_today?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/airing_today' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetTvShowsAiringToday = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getTvShowsAiringToday(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of tv shows airing now Eastern Time UTC-05:00 (paginated)
const getTvShowsAiringNow = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/on_the_air' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetTvShowsAiringNow = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getTvShowsAiringNow(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of similar tv shows by tv show ID (paginated)
const getSimilarTvShowsById = (tvId, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/tv/20/similar?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/similar' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetSimilarTvShowsById = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getSimilarTvShowsById(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of recommended tv shows by tv show ID (paginated)
const getRecommendedTvShowsById = (tvId, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/tv/2/recommendations?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/recommendations' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetRecommendedTvShowsById = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getRecommendedTvShowsById(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of videos by tv show ID
const getTvShowVideosById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/88/videos?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/videos' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowVideosById = (req, res) => {
    const id = req.params['id'];
    getTvShowVideosById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get external links of a tv show by tv show ID
const getTvShowExternalLinksById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/2/external_ids?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/external_ids' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetTvShowExternalLinksById = (req, res) => {
    const id = req.params['id'];
    getTvShowExternalLinksById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get tv show images by tv show ID
const getTvShowsImagesById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/92/images?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/images' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowsImagesById = (req, res) => {
    const id = req.params['id'];
    getTvShowsImagesById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get tv show details by tv show ID
const getTvShowDetailsById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/2?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowDetailsById = (req, res) => {
    const id = req.params['id'];
    getTvShowDetailsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of tv show credits (cast) by tv show ID
const getTvShowCreditsById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/2/credits?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/credits' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowCreditsById = (req, res) => {
    const id = req.params['id'];
    getTvShowCreditsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of keywords of a movie by movie ID
const getTvShowKeywordsById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/2/keywords?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/keywords' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetTvShowKeywordsById = (req, res) => {
    const id = req.params['id'];
    getTvShowKeywordsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of alternative titles of a movie by movie ID
const getTvShowAlternativeTitlesById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/2/alternative_titles?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/alternative_titles' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowAlternativeTitlesById = (req, res) => {
    const id = req.params['id'];
    getTvShowAlternativeTitlesById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of translations of a movie by movie ID
const getTvShowTranslationsById = (tvId) => {
    // const url = 'https://api.themoviedb.org/3/tv/2/translations?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'tv/' + tvId + '/translations' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetTvShowTranslationsById = (req, res) => {
    const id = req.params['id'];
    getTvShowTranslationsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
