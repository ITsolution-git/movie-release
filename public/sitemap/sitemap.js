"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const firebase_config_1 = require("../firebase/firebase-config");
const constants_1 = require("../constants");
const getMoviesList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.MOVIES, setup)
            .then(data => {
            let moviesList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                moviesList = moviesList.concat(element);
            }
            resolve(moviesList);
        });
    });
};
exports.tryGenerateMoviesSitemap = (req, res) => {
    getMoviesList()
        .then((resp) => {
        generateSitemap(resp, 'movies');
    });
};
const getTvShowsList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.TV_SHOWS, setup)
            .then(data => {
            let tvShowsList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                tvShowsList = tvShowsList.concat(element);
            }
            resolve(tvShowsList);
        });
    });
};
exports.tryGenerateTvShowsSitemap = (req, res) => {
    getTvShowsList()
        .then((resp) => {
        generateSitemap(resp, 'tv-shows');
    });
};
const getCelebsList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.CELEBS, setup)
            .then(data => {
            let celebsList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                celebsList = celebsList.concat(element);
            }
            resolve(celebsList);
        });
    });
};
exports.tryGenerateCelebsSitemap = (req, res) => {
    getCelebsList()
        .then((resp) => {
        generateSitemap(resp, 'celebs');
    });
};
const getProfilesList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.PROFILES, setup)
            .then(data => {
            let profilesList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                profilesList = profilesList.concat(element);
            }
            resolve(profilesList);
        });
    });
};
exports.tryGenerateProfilesSitemap = (req, res) => {
    getProfilesList()
        .then((resp) => {
        generateSitemap(resp, 'profiles');
    });
};
const getPagesList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.PAGES, setup)
            .then(data => {
            let pagesList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                pagesList = pagesList.concat(element);
            }
            resolve(pagesList);
        });
    });
};
exports.tryGeneratePagesSitemap = (req, res) => {
    getPagesList()
        .then((resp) => {
        generateSitemap(resp, 'pages');
    });
};
const getMovieGenresList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.MOVIE_GENRES, setup)
            .then(data => {
            let movieGenresList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                movieGenresList = movieGenresList.concat(element);
            }
            resolve(movieGenresList);
        });
    });
};
exports.tryGenerateMovieGenresSitemap = (req, res) => {
    getMovieGenresList()
        .then((resp) => {
        generateSitemap(resp, 'movie-genres');
    });
};
const getTvShowGenresList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.TV_GENRES, setup)
            .then(data => {
            let tvShowGenresList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                tvShowGenresList = tvShowGenresList.concat(element);
            }
            resolve(tvShowGenresList);
        });
    });
};
exports.tryGenerateTvShowGenresSitemap = (req, res) => {
    getTvShowGenresList()
        .then((resp) => {
        generateSitemap(resp, 'tv-show-genres');
    });
};
const getCompaniesList = (setup = null) => {
    return new Promise((resolve, reject) => {
        firebase_config_1.loadList(firebase_config_1.DB_LISTS.COMPANIES, setup)
            .then(data => {
            let companiesList = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index].url;
                companiesList = companiesList.concat(element);
            }
            resolve(companiesList);
        });
    });
};
exports.tryGenerateCompaniesSitemap = (req, res) => {
    getCompaniesList()
        .then((resp) => {
        generateSitemap(resp, 'companies');
    });
};
const generateSitemap = (data, type) => {
    const urls = data;
    const root_path = constants_1.APP_ROOT_URL;
    // Generate XML sitemap
    const priority = 0.5;
    const freq = 'monthly';
    let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (let index in urls) {
        if (urls) {
            xml += '<url>';
            xml += '<loc>' + root_path + urls[index] + '</loc>';
            xml += '<changefreq>' + freq + '</changefreq>';
            xml += '<priority>' + priority + '</priority>';
            xml += '</url>';
            index += index;
        }
    }
    xml += '</urlset>';
    saveXMLFile(xml, type);
    // return xml;
};
const saveXMLFile = (xml, type) => {
    const date = Date.now();
    fs.appendFile(type + '-sitemap-' + date + '.xml', xml, function (err) {
        if (err) {
            throw err;
        }
        console.log(type + '-sitemap-' + date + '.xml Sitemap Saved!');
    });
};
