import { Component, OnInit } from '@angular/core';
// Services
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private as: AppService
  ) { }

  ngOnInit() {
  }

}
