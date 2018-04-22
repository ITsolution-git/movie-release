// App
export const APP_SEO_NAME = 'Current Movie Releases';
export const APP_BASE_URL = 'https://www.currentmoviereleases.com';
export const DEFAULT_USER_IMG = '/assets/img/default-user.png';
export const DEFAULT_POSTER_IMG = '/assets/img/default-poster.png';
export const DEFAULT_PROFILE_IMG = '/assets/img/default-poster1.png';
export const DEFAULT_USER_ROLE = 'subscriber';
export const DEFAULT_FB_IMG = '/assets/img/currentmoviereleases_logo_v2.svg';
export const DEFAULT_FB_CAT_IMG = 'https://www.currentmoviereleases.com/assets/img/current_movie_releases_fb_cat.jpg';

// Database Collections
export const DB_COL = {
    API_CONFIG: '/api_config',
    ARTICLES: '/articles',
    CELEBS: '/celebs',
    CELEBS_QUERIES: '/celebs_queries',
    CELEBS_RESULTS: '/celebs_results',
    MOVIE_GENRES: '/movie_genres',
    MOVIE_RATINGS: '/movie_ratings',
    MOVIES: '/movies',
    MOVIES_QUERIES: '/movies_queries',
    MOVIES_RESULTS: '/movies_results',
    SETTINGS: '/settings',
    SETTINGS_SEO_MOVIES: '/settings/seo/movies',
    SETTINGS_SEO_GENRE_MOVIES: '/settings/seo/genre_movies',
    SETTINGS_SEO_CELEBS: '/settings/seo/celebs',
    SETTINGS_ADS: '/settings/ads',
    UPLOADS: '/uploads',
    USERS: '/users'
};

// TMDB Configs
export const TMDB_IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/';
// Image Sizes
export const IMG_45 = 'w45';
export const IMG_92 = 'w92';
export const IMG_154 = 'w154';
export const IMG_185 = 'w185';
export const IMG_300 = 'w300';
export const IMG_500 = 'w500';
export const IMG_632 = 'h632';
export const IMG_780 = 'w780';
export const IMG_1280 = 'w1280';
export const IMG_ORIG = 'original';

// Youtube
export const YT_BASE_URL = 'https://www.youtube.com/embed/';
export const YT_VIDEO_OPTIONS = {
    NO_SUGGESTED_VIDEOS: '?rel=0',
    AUTOPLAY: '&autoplay=1',
    COLOR_WHITE: '&color=black',
    NO_WIDEO_ANNOTAIONS: '&iv_load_policy=3',
    NO_YT_LOGO: '&modestbranding=1',
    CUSTOM_PLAYLIST: '&playlist=',
    HIDE_INFO: '&showinfo=0'
};
export const YT_THUMB_BASE_URL = 'https://i3.ytimg.com/vi/';
export const YT_THUMB_SIZES = {
    MAX_RES: '/maxresdefault.jpg'
};

// CK Editor
export const ckEditorConfig: {} = {
    'uiColor': '#dddddd',
    'toolbarGroups': [
        { name: 'document', 'groups': ['mode'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' }
    ],
    'removeButtons': 'Print,NewPage,Preview,Save,Language,Flash,Smiley,Iframe'
};
