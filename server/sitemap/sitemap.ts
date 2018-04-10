import * as fs from 'fs';
import * as FBAdmin from 'firebase-admin';
import { loadList, DB_LISTS } from '../firebase/firebase-config';
import { APP_ROOT_URL } from '../constants';

const getMoviesList = (setup: (r: FBAdmin.database.Reference) => FBAdmin.database.Query = null): Promise<any[]> => {
    console.log('Getting Movies From Database');
    return new Promise<any[]>((resolve, reject) => {
        loadList(DB_LISTS.MOVIES_RESULTS, setup)
            .then(data => {
                let moviesList = [];
                const dataLength = data.length;
                console.log(dataLength, ' Movies Loaded From Database.');
                console.log('Looping through all movies, and grabbing the url properties...');
                for (let index = 0; index < dataLength; index++) {
                    const element = data[index].url;
                    moviesList = moviesList.concat(element);
                    calculateSitemapGenerationPercenrtage(index, dataLength)
                        .then(res => {
                            console.log(`Loading: ${res}%`);
                        })
                        .catch(error => {
                            console.log('Error with Calculating Sitemap Loading Percentage', error);
                        });
                }
                resolve(moviesList);
            })
            .catch(error => {
                console.log('There was an error returnning movie results from firebase! ', error);
            });
    });
};
export const tryGenerateMoviesSitemap = (req, res) => {
    getMoviesList()
        .then((resp) => {
            console.log('All URLs are grabbed... generating Sitemap.');
            generateSitemap(resp, 'movies');
        })
        .catch(error => {
            console.log('There was an error returnning movie results from firebase! ', error);
        });
};

const getMovieGenresList = (setup: (r: FBAdmin.database.Reference) => FBAdmin.database.Query = null): Promise<any[]> => {
    console.log('Getting Movies From Database');
    return new Promise<any[]>((resolve, reject) => {
        loadList(DB_LISTS.MOVIE_GENRES, setup)
            .then(data => {
                let movieGenresList = [];
                const dataLength = data.length;
                console.log(dataLength, ' Movie Genres Loaded From Database.');
                console.log('Looping through all Movie Genres, and grabbing the url properties...');
                for (let index = 0; index < dataLength; index++) {
                    const element = data[index].url;
                    movieGenresList = movieGenresList.concat(element);
                    calculateSitemapGenerationPercenrtage(index, dataLength)
                        .then(res => {
                            console.log(`Loading: ${res}%`);
                        })
                        .catch(error => {
                            console.log('Error with Calculating Sitemap Loading Percentage', error);
                        });
                }
                resolve(movieGenresList);
            })
            .catch(error => {
                console.log('There was an error returnning movie genres from firebase! ', error);
            });
    });
};
export const tryGenerateMovieGenresSitemap = (req, res) => {
    getMovieGenresList()
        .then((resp) => {
            console.log('All URLs are grabbed... generating Sitemap.');
            generateSitemap(resp, 'movie-genres');
        })
        .catch(error => {
            console.log('There was an error returnning movie genres from firebase! ', error);
        });
};

const getCelebsList = (setup: (r: FBAdmin.database.Reference) => FBAdmin.database.Query = null): Promise<any[]> => {
    console.log('Getting Celebs From Database');
    return new Promise<any[]>((resolve, reject) => {
        loadList(DB_LISTS.CELEBS_RESULTS, setup)
            .then(data => {
                let celebsList = [];
                const dataLength = data.length;
                console.log(dataLength, ' Celebs Loaded From Database.');
                console.log('Looping through all celebs, and grabbing the url properties...');
                for (let index = 0; index < dataLength; index++) {
                    const element = data[index].url;
                    celebsList = celebsList.concat(element);
                    calculateSitemapGenerationPercenrtage(index, dataLength)
                        .then(res => {
                            console.log(`Loading: ${res}%`);
                        })
                        .catch(error => {
                            console.log('Error with Calculating Sitemap Loading Percentage', error);
                        });
                }
                resolve(celebsList);
            })
            .catch(error => {
                console.log('There was an error returnning celeb results from firebase! ', error);
            });
    });
};
export const tryGenerateCelebsSitemap = (req, res) => {
    getCelebsList()
        .then((resp) => {
            console.log('All URLs are grabbed... generating Sitemap.');
            generateSitemap(resp, 'celebs');
        })
        .catch(error => {
            console.log('There was an error returnning celeb results from firebase! ', error);
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
            xml += '<loc>' + root_path + '/' + urls[index] + '</loc>';
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
    fs.appendFile('sitemaps/' + type + '-sitemap-' + date + '.xml', xml, function (err) {
        if (err) {
            throw err;
        }
        console.log(type + '-sitemap-' + date + '.xml Sitemap Saved!');
    });
};

const calculateSitemapGenerationPercenrtage = (index: number, dataLength: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        resolve((index * 100) / dataLength);
    });
};
