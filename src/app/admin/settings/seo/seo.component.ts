import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
// AngularFire
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ToastsManager } from 'ng2-toastr';
// RxJs
import { Observable } from 'rxjs/Observable';
// Constants
import { DB_COL } from '../../../constants';
@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.css']
})
export class SeoComponent implements OnInit {

  categoryDescriptionForm;
  // Movies
  seoSettingsMoviesRef: AngularFireList<any>;
  seoSettingsMoviesObsRef: Observable<any>;
  seoSettingsMovies: any[];
  // Movie Genres
  seoSettingsMovieGenresRef: AngularFireList<any>;
  seoSettingsMovieGenresObsRef: Observable<any>;
  seoSettingsMovieGenres: any[];
  // Celebs
  seoSettingsCelebsRef: AngularFireList<any>;
  seoSettingsCelebsObsRef: Observable<any>;
  seoSettingsCelebs: any[];

  constructor(
    private afDb: AngularFireDatabase,
    private fb: FormBuilder,
    private toast: ToastsManager
  ) {
    this.categoryDescriptionForm = fb.group({
      moviesCats: fb.array([]),
      movieGenresCats: fb.array([]),
      celebsCats: fb.array([])
    });

    this.seoSettingsMoviesRef = this.afDb.list(`${DB_COL.SETTINGS_SEO_MOVIES}`);
    this.seoSettingsMoviesObsRef = afDb.list(DB_COL.SETTINGS_SEO_MOVIES).valueChanges();
    this.seoSettingsMovieGenresRef = this.afDb.list(`${DB_COL.SETTINGS_SEO_GENRE_MOVIES}`);
    this.seoSettingsMovieGenresObsRef = afDb.list(DB_COL.SETTINGS_SEO_GENRE_MOVIES).valueChanges();
    this.seoSettingsCelebsRef = this.afDb.list(`${DB_COL.SETTINGS_SEO_CELEBS}`);
    this.seoSettingsCelebsObsRef = afDb.list(DB_COL.SETTINGS_SEO_CELEBS).valueChanges();

    this.seoSettingsMoviesObsRef
      .subscribe(res => {
        this.seoSettingsMovies = res;
        this.initializeMoviesFormContents();
      });
    this.seoSettingsMovieGenresObsRef
      .subscribe(res => {
        this.seoSettingsMovieGenres = res;
        this.initializeMovieGenresFormContents();
      });
    this.seoSettingsCelebsObsRef
      .subscribe(res => {
        this.seoSettingsCelebs = res;
        this.initializeCelebsFormContents();
      });
  }

  ngOnInit(): void { }

  initializeMoviesFormContents() {
    const arrayOfMoviesCats = <FormArray>this.categoryDescriptionForm.controls.moviesCats;
    this.seoSettingsMovies.forEach(cat => {
      arrayOfMoviesCats.push(
        this.fb.group({
          title: [cat.title, Validators.required],
          description: [cat.descr, Validators.required],
          bg: [cat.bg_path]
        })
      );
    });
  }
  initializeMovieGenresFormContents() {
    const arrayOfMovieGenresCats = <FormArray>this.categoryDescriptionForm.controls.movieGenresCats;
    this.seoSettingsMovieGenres.forEach(cat => {
      arrayOfMovieGenresCats.push(
        this.fb.group({
          title: [cat.title, Validators.required],
          description: [cat.descr, Validators.required],
          bg: [cat.bg_path]
        })
      );
    });
  }
  initializeCelebsFormContents() {
    const arrayOfCelebsCats = <FormArray>this.categoryDescriptionForm.controls.celebsCats;
    this.seoSettingsCelebs.forEach(cat => {
      arrayOfCelebsCats.push(
        this.fb.group({
          title: [cat.title, Validators.required],
          description: [cat.descr, Validators.required],
          bg: [cat.bg_path]
        })
      );
    });
  }

  saveCategoryDetails(title: string, descr: string, bg: string, category: string): void {
    if (title !== '' && descr !== '') {
      const updateObj = {
        title: title,
        descr: descr,
        bg_path: bg
      };
      if (category === 'Movies (Main)') {
        this.updateDbSettingsMoviesCollection('_movies_main', updateObj, category);
      } else if (category === 'Upcoming Movies') {
        this.updateDbSettingsMoviesCollection('upcoming_movies', updateObj, category);
      } else if (category === 'Now Playing Movies') {
        this.updateDbSettingsMoviesCollection('now_playing_movies', updateObj, category);
      } else if (category === 'Most Popular Movies') {
        this.updateDbSettingsMoviesCollection('most_popular_movies', updateObj, category);
      } else if (category === 'Top Rated Movies') {
        this.updateDbSettingsMoviesCollection('top_rated_movies', updateObj, category);
      } else if (category === 'Genres (Main)') {
        this.updateDbSettingsMovieGenresCollection('_genres_main', updateObj, category);
      } else if (category === 'Action Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_action_movies', updateObj, category);
      } else if (category === 'Adventure Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_adventure_movies', updateObj, category);
      } else if (category === 'Animation Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_animation_movies', updateObj, category);
      } else if (category === 'Comedy Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_comedy_movies', updateObj, category);
      } else if (category === 'Crime Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_crime_movies', updateObj, category);
      } else if (category === 'Documentary Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_documentary_movies', updateObj, category);
      } else if (category === 'Drama Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_drama_movies', updateObj, category);
      } else if (category === 'Family Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_family_movies', updateObj, category);
      } else if (category === 'Fantasy Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_fantasy_movies', updateObj, category);
      } else if (category === 'History Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_history_movies', updateObj, category);
      } else if (category === 'Horror Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_horror_movies', updateObj, category);
      } else if (category === 'Music Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_music_movies', updateObj, category);
      } else if (category === 'Mystery Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_mystery_movies', updateObj, category);
      } else if (category === 'Romance Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_romance_movies', updateObj, category);
      } else if (category === 'Science Fiction Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_science_fiction_movies', updateObj, category);
      } else if (category === 'Thriller Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_thriller_movies', updateObj, category);
      } else if (category === 'TV Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_tv_movies', updateObj, category);
      } else if (category === 'War Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_war_movies', updateObj, category);
      } else if (category === 'Western Movies') {
        this.updateDbSettingsMovieGenresCollection('genre_western_movies', updateObj, category);
      } else if (category === 'Celebrities (Main)') {
        this.updateDbSettingsCelebsCollection('_celebs_main', updateObj, category);
      }
    } else {
      this.toast.error('Please fill out all required fields, before saving!');
    }
  }

  updateDbSettingsMoviesCollection(collection: string, updateObj: Object, category: string) {
    this.seoSettingsMoviesRef
      .update(collection, updateObj)
      .then(() => this.showToastMessage(true, category))
      .catch(error => this.showToastMessage(false, category));
  }
  updateDbSettingsMovieGenresCollection(collection: string, updateObj: Object, category: string) {
    this.seoSettingsMovieGenresRef
      .update(collection, updateObj)
      .then(() => this.showToastMessage(true, category))
      .catch(error => this.showToastMessage(false, category));
  }
  updateDbSettingsCelebsCollection(collection: string, updateObj: Object, category: string) {
    this.seoSettingsCelebsRef
      .update(collection, updateObj)
      .then(() => this.showToastMessage(true, category))
      .catch(error => this.showToastMessage(false, category));
  }

  showToastMessage(isSuccess: boolean, category: string) {
    if (isSuccess) {
      this.toast.success(`${category} Updated!`);
    } else {
      this.toast.error(`There was an error updating ${category}!`);
    }
  }

}
