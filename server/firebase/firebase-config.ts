import * as admin from 'firebase-admin';
import * as path from 'path';

// Firebase Service Account Configuration
const serviceAccountPath: any = 'current-movie-releases-firebase-adminsdk-xlpoy-fadf799c6c.json';
admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, serviceAccountPath)),
    databaseURL: 'https://current-movie-releases.firebaseio.com'
});

export let AD = admin;
export const DB_LISTS = {
    API_CONFIG: '/api_config',
    MOVIE_GENRES: '/movie_genres',
    MOVIES: '/movies',
    MOVIES_QUERIES: '/movies_queries',
    MOVIES_RESULTS: '/movies_results',
    UPLOADS: '/uploads',
    USERS: '/users'
};
export const loadList = (name: string, setup: (r: admin.database.Reference) => admin.database.Query = null): Promise<any[]> => {
    return new Promise<any[]>((resolve, reject) => {
        const ref = admin.database().ref(name);
        let query: admin.database.Query;
        if (setup) {
            query = setup(ref);
        } else {
            query = ref.orderByKey();
        }
        query.on('value', snapshots => {
            const results: any[] = [];
            snapshots.forEach(p => {
                results.unshift({
                    $key: p.key,
                    ...p.val()
                });
                return false;
            });
            resolve(results);
            ref.off('value');
        });

    });
};

export const loadObject = (listUrl: string, id: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const ref = admin.database().ref(`${listUrl}/${id}`);
        ref.once('value').then(data => {
            let result: any = null;
            result = {
                $key: id,
                ...data.val()
            };
            resolve(result);
            ref.off('value');
        });
    });
};

export const loadValue = (url: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const ref = admin.database().ref(url);
        ref.once('value').then(data => {
            resolve(data.val());
            ref.off('value');
        });
    });
};
