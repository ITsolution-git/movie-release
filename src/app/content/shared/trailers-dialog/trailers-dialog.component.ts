import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Services
import { ApiService } from '../../../core/services/api/api.service';
// Constants
import { YT_BASE_URL, YT_VIDEO_OPTIONS, YT_THUMB_BASE_URL, YT_THUMB_SIZES } from '../../../constants';

@Component({
  selector: 'app-trailers-dialog',
  templateUrl: './trailers-dialog.component.html',
  styleUrls: ['./trailers-dialog.component.css']
})
export class TrailersDialogComponent implements OnInit {

  trailersObj: any;
  videoThumbs: string[];
  videoURLs: string[];
  safeURL: any;
  playlist: string[];
  isPlaylistOpen = true;

  constructor(
    private apis: ApiService,
    private _sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<TrailersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data === 'movie') {
      this.trailersObj = this.apis.movieTrailers['results'];
      this.callCreatePlaylist();
    }
  }

  ngOnInit(): void { }

  callCreatePlaylist() {
    this.createPlaylist(this.trailersObj)
      .then((res) => {
        this.playlist = res;
        this.generateYoutubeLinks(this.trailersObj)
          .then((links) => {
            this.videoURLs = links;
            // console.log(this.videoURLs);
            this.sanitizeURL(this.videoURLs[0]);
          });
      });
  }

  createPlaylist(trailersObj: any): Promise<string[]> {
    const keys = [];
    return new Promise<any>((resolve, reject) => {
      for (let index = 0; index < trailersObj.length; index++) {
        const element = trailersObj[index].key;
        keys.push(element);
      }
      // console.log(keys);
      resolve(keys);
    });
  }

  generateYoutubeLinks(trailersObj: any): Promise<string[]> {
    const urls = [];
    const thumbs = [];
    return new Promise<any>((resolve, reject) => {
      for (let index = 0; index < trailersObj.length; index++) {
        const currentPlaylist = this.playlist.slice(index + 1);
        // console.log(currentPlaylist);
        const element = trailersObj[index].key;
        thumbs.push(YT_THUMB_BASE_URL + element + YT_THUMB_SIZES.MAX_RES);
        // tslint:disable-next-line:max-line-length
        urls.push(YT_BASE_URL + element + YT_VIDEO_OPTIONS.NO_SUGGESTED_VIDEOS + YT_VIDEO_OPTIONS.AUTOPLAY + YT_VIDEO_OPTIONS.COLOR_WHITE + YT_VIDEO_OPTIONS.NO_WIDEO_ANNOTAIONS + YT_VIDEO_OPTIONS.HIDE_INFO + YT_VIDEO_OPTIONS.CUSTOM_PLAYLIST + currentPlaylist);
      }
      this.videoThumbs = thumbs;
      // console.log(urls);
      resolve(urls);
    });
  }

  sanitizeURL(url: string): void {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    setTimeout(() => {
      this.togglePlaylist();
    }, 1000);
  }

  togglePlaylist() {
    this.isPlaylistOpen = !this.isPlaylistOpen;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
