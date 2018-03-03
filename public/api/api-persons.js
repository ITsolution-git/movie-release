"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const constants_1 = require("../constants");
// Persons API Calls
// Get the list of persons by search keyword (paginated) OK
const getPersonsListByKeyword = (keyword, pageIndex) => {
    // tslint:disable-next-line:max-line-length
    // const url = 'https://api.themoviedb.org/3/search/person?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&query=depp&page=1&include_adult=false';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'search/person' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&query=' + keyword + '&page=' + pageIndex + '&include_adult=false', (resp) => {
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
exports.tryGetPersonsListByKeyword = (req, res) => {
    const keyword = req.params['keyword'];
    const pageIndex = req.params['pageIndex'];
    getPersonsListByKeyword(keyword, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of popular persons (paginated)
const getPopularPersons = (pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/person/popular?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/popular' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetPopularPersons = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getPopularPersons(pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get the list of latest persons
const getLatestPersons = () => {
    // const url = 'https://api.themoviedb.org/3/person/latest?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/latest' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetLatestPersons = (req, res) => {
    getLatestPersons()
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get person details by person ID
const getPersonDetailsById = (personId) => {
    // const url = 'https://api.themoviedb.org/3/person/99?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/' + personId + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetPersonDetailsById = (req, res) => {
    const id = req.params['id'];
    getPersonDetailsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get person movie credits by person ID
const getPersonMovieCreditsById = (personId) => {
    // const url = 'https://api.themoviedb.org/3/person/9827/movie_credits?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/' + personId + '/movie_credits' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetPersonMovieCreditsById = (req, res) => {
    const id = req.params['id'];
    getPersonMovieCreditsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get person tv credits by person ID
const getPersonTvCreditsById = (personId) => {
    // const url = 'https://api.themoviedb.org/3/person/137905/tv_credits?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/' + personId + '/tv_credits' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetPersonTvCreditsById = (req, res) => {
    const id = req.params['id'];
    getPersonTvCreditsById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get person movie credits by person ID
const getPersonExternalLinksById = (personId) => {
    // const url = 'https://api.themoviedb.org/3/person/9827/external_ids?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/' + personId + '/external_ids' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG, (resp) => {
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
exports.tryGetPersonExternalLinksById = (req, res) => {
    const id = req.params['id'];
    getPersonExternalLinksById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get person images by person ID
const getPersonImagesById = (personId) => {
    // const url = 'https://api.themoviedb.org/3/person/9827/images?api_key=3df8259258e7a30cb15e76ae75259892';
    return new Promise((resolve, reject) => {
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/' + personId + '/images' + constants_1.TMDB_API_KEY, (resp) => {
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
exports.tryGetPersonImagesById = (req, res) => {
    const id = req.params['id'];
    getPersonImagesById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
// Get person images by person ID (paginated)
const getPersonTaggedImagesById = (personId, pageIndex) => {
    // const url = 'https://api.themoviedb.org/3/person/12835/tagged_images?api_key=3df8259258e7a30cb15e76ae75259892&language=en-US&page=1';
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:max-line-length
        https.get(constants_1.TMDB_API_URL_ROOT + constants_1.TMDB_API_VER + 'person/' + personId + '/tagged_images' + constants_1.TMDB_API_KEY + constants_1.TMDB_API_LANG + '&page=' + pageIndex, (resp) => {
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
exports.tryGetPersonTaggedImagesById = (req, res) => {
    const id = req.params['id'];
    const pageIndex = req.params['pageIndex'];
    getPersonTaggedImagesById(id, pageIndex)
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        console.log(error);
    });
};
