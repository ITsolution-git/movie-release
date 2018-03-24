import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveService {

  constructor() { }

  checkSmallScreen(): boolean {
    if (window.innerWidth < 959) {
      return true;
    } else {
      return false;
    }
  }

  checkExtraSmallScreen(): boolean {
    if (window.innerWidth < 600) {
      return true;
    } else {
      return false;
    }
  }
}
