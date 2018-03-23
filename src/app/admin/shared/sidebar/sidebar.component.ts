import { Component, OnInit } from '@angular/core';
// Service
import { AuthService } from '../../../core/auth/services/auth.service';
import { ArticlesService } from '../../articles/articles.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public as: AuthService,
    public ars: ArticlesService
  ) { }

  ngOnInit() {
  }

  sidebarToggle() {
  }
}
