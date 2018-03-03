import * as https from 'https';
import {
    TMDB_API_URL_ROOT,
    TMDB_API_KEY,
    TMDB_API_VER,
    TMDB_API_LANG
} from '../constants';

// Get the list of movies by search keyword (paginated) OK
const getMoviesListByKeyword = (keyword: string, pageIndex: number): Promise<any> => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/search/movie?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&query=gladiator&page=1&include_adult=false';
    return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'search/movie' + TMDB_API_KEY + TMDB_API_LANG + '&query=' + keyword + '&page=' + pageIndex + '&include_adult=false', (resp) => {
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
export const tryGetMoviesListByKeyword = (req, res) => {
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
const getMoviesListByGenreId = (genreId: string, pageIndex: number): Promise<any> => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/discover/movie?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18';
    return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'discover/movie' + TMDB_API_KEY + TMDB_API_LANG + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageIndex + '&with_genres=' + genreId, (resp) => {
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
export const tryGetMoviesListByGenreId = (req, res) => {
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
const getMovieDetailsById = (movieId: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/555?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + TMDB_API_KEY + TMDB_API_LANG, (resp) => {
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
export const tryGetMovieDetailsById = (req, res) => {
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
const getMovieCreditsById = (movieId: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/555/credits?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/credits' + TMDB_API_KEY, (resp) => {
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
export const tryGetMovieCreditsById = (req, res) => {
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
const getMovieReviewById = (movieId: string, pageIndex: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/reviews?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/reviews' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetMovieReviewById = (req, res) => {
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
const getPopularMovies = (pageIndex: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/popular?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/popular' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetPopularMovies = (req, res) => {
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
const getLatestMovies = (): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/latest?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/latest' + TMDB_API_KEY + TMDB_API_LANG, (resp) => {
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
export const tryGetLatestMovies = (req, res) => {
    getLatestMovies()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Get the list of top rated movies (paginated)
const getTopRatedMovies = (pageIndex: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/top_rated' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetTopRatedMovies = (req, res) => {
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
const getUpcomingMovies = (pageIndex: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/upcoming' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetUpcomingMovies = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getUpcomingMovies(pageIndex)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Get the list of now playing movies (paginated)
const getNowPlayingMovies = (pageIndex): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/now_playing' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetNowPlayingMovies = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getNowPlayingMovies(pageIndex)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Get the list of movies by company ID
const getMoviesByCompanyId = (companyId: number, pageIndex: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/company/2/movies?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'company/' + companyId + '/movies' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetMoviesByCompanyId = (req, res) => {
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
const getSimilarMoviesById = (movieId: string, pageIndex: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/similar?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/similar' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetSimilarMoviesById = (req, res) => {
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
const getRecommendedMoviesById = (movieId: string, pageIndex: number): Promise<any> => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/movie/106646/recommendations?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/recommendations' + TMDB_API_KEY + TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
export const tryGetRecommendedMoviesById = (req, res) => {
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
const getMovieVideosById = (movieId: string): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/videos?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/videos' + TMDB_API_KEY + TMDB_API_LANG, (resp) => {
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
export const tryGetMovieVideosById = (req, res) => {
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
const getMovieTranslationsById = (movieId: string): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/translations?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/translations' + TMDB_API_KEY, (resp) => {
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
export const tryGetMovieTranslationsById = (req, res) => {
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
const getMovieReleaseDatesById = (movieId: string): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/release_dates?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/release_dates' + TMDB_API_KEY, (resp) => {
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
export const tryGetMovieReleaseDatesById = (req, res) => {
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
const getMovieKeywordsById = (movieId: string): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/keywords?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/keywords' + TMDB_API_KEY, (resp) => {
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
export const tryGetMovieKeywordsById = (req, res) => {
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
const getAlternativeTitlesById = (movieId: string): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/alternative_titles?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/alternative_titles' + TMDB_API_KEY, (resp) => {
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
export const tryGetAlternativeTitlesById = (req, res) => {
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
const getMovieExternalLinksById = (movieId: string): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/98/external_ids?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/external_ids' + TMDB_API_KEY, (resp) => {
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
export const tryGetMovieExternalLinksById = (req, res) => {
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
const getMovieImagesById = (movieId: number): Promise<any> => {
    // const url = 'https://api.themoviedb.org/3/movie/1734/images?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise<any>((resolve, reject) => {
        https.get(TMDB_API_URL_ROOT + TMDB_API_VER + 'movie/' + movieId + '/images' + TMDB_API_KEY + TMDB_API_LANG, (resp) => {
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
export const tryGetMovieImagesById = (req, res) => {
    const id = req.params['id'];
    getMovieImagesById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};
