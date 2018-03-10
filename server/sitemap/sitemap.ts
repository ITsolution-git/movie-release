import * as fs from 'fs';
import * as FBAdmin from 'firebase-admin';
import { loadList, DB_LISTS } from '../firebase/firebase-config';
import { APP_ROOT_URL } from '../constants';

const getMoviesList = (setup: (r: FBAdmin.database.Reference) => FBAdmin.database.Query = null): Promise<any[]> => {
    return new Promise<any[]>((resolve, reject) => {
        loadList(DB_LISTS.MOVIES, setup)
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
export const tryGenerateMoviesSitemap = (req, res) => {
    getMoviesList()
        .then((resp) => {
            generateSitemap(resp, 'movies');
        });
};

const getMovieGenresList = (setup: (r: FBAdmin.database.Reference) => FBAdmin.database.Query = null): Promise<any[]> => {
    return new Promise<any[]>((resolve, reject) => {
        loadList(DB_LISTS.MOVIE_GENRES, setup)
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
export const tryGenerateMovieGenresSitemap = (req, res) => {
    getMovieGenresList()
        .then((resp) => {
            generateSitemap(resp, 'movie-genres');
        });
};

const generateSitemap = (data: Array<any>, type: string) => {
    const urls = data;
    const root_path = APP_ROOT_URL;
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

const saveXMLFile = (xml: any, type: string) => {
    const date = Date.now();
    fs.appendFile(type + '-sitemap-' + date + '.xml', xml, function (err) {
        if (err) {
            throw err;
        }
        console.log(type + '-sitemap-' + date + '.xml Sitemap Saved!');
    });
};
