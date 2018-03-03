"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const path = require("path");
// Firebase Service Account Configuration
const serviceAccountPath = 'rock-extension-140016-firebase-adminsdk-2asfm-ffb6cb4019.json';
admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, serviceAccountPath)),
    databaseURL: 'https://rock-extension-140016.firebaseio.com'
});
exports.AD = admin;
exports.DB_LISTS = {
    API_CONFIG: '/api_config',
    CELEBS: '/celebs',
    CELEBS_QUERIES: '/celebs_queries',
    CELEBS_RESULTS: '/celebs_results',
    COMPANIES: '/companies',
    MOVIE_GENRES: '/movie_genres',
    MOVIES: '/movies',
    MOVIES_QUERIES: '/movies_queries',
    MOVIES_RESULTS: '/movies_results',
    PAGES: '/pages',
    PROFILES: '/profiles',
    SETTINGS: '/settings',
    TV_GENRES: '/tv_genres',
    TV_SHOWS: '/tv_shows',
    TV_SHOWS_QUERIES: '/tv_shows_queries',
    TV_SHOWS_RESULTS: '/tv_shows_results',
    UPLOADS: '/uploads',
    USERS: '/users',
    ARTICLES: '/articles',
    PAGE_TYPES: '/page_types',
    TAGS: '/tags',
    DIRECTORS: '/directors',
};
exports.loadList = (name, setup = null) => {
    return new Promise((resolve, reject) => {
        const ref = admin.database().ref(name);
        let query;
        if (setup) {
            query = setup(ref);
        }
        else {
            query = ref.orderByKey();
        }
        query.on('value', snapshots => {
            const results = [];
            snapshots.forEach(p => {
                results.unshift(Object.assign({ $key: p.key }, p.val()));
                return false;
            });
            resolve(results);
            ref.off('value');
        });
    });
};
exports.loadObject = (listUrl, id) => {
    return new Promise((resolve, reject) => {
        const ref = admin.database().ref(`${listUrl}/${id}`);
        ref.once('value').then(data => {
            let result = null;
            result = Object.assign({ $key: id }, data.val());
            resolve(result);
            ref.off('value');
        });
    });
};
exports.loadValue = (url) => {
    return new Promise((resolve, reject) => {
        const ref = admin.database().ref(url);
        ref.once('value').then(data => {
            resolve(data.val());
            ref.off('value');
        });
    });
};
