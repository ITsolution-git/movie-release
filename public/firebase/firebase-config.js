"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const path = require("path");
// Firebase Service Account Configuration
const serviceAccountPath = 'current-movie-releases-firebase-adminsdk-xlpoy-fadf799c6c.json';
admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, serviceAccountPath)),
    databaseURL: 'https://current-movie-releases.firebaseio.com'
});
exports.AD = admin;
exports.DB_LISTS = {
    API_CONFIG: '/api_config',
    MOVIE_GENRES: '/movie_genres',
    MOVIES: '/movies',
    MOVIES_QUERIES: '/movies_queries',
    MOVIES_RESULTS: '/movies_results',
    UPLOADS: '/uploads',
    USERS: '/users'
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
