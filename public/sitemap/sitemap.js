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
const generateSitemap = (data, type) => {
    const urls = data;
    const root_path = constants_1.APP_ROOT_URL;
    // Generate XML sitemap
    const priority = 0.5;
    const freq = 'weekly';
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
