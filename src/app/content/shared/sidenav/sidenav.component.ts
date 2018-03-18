import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private as: AppService,
    public aus: AuthService,
    private apis: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
