// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBdditGKcqxYFcYN7vtVBMCNo8OhtGGHr4",
    authDomain: "current-movie-releases.firebaseapp.com",
    databaseURL: "https://current-movie-releases.firebaseio.com",
    projectId: "current-movie-releases",
    storageBucket: "current-movie-releases.appspot.com",
    messagingSenderId: "828894124501"
  }
};
