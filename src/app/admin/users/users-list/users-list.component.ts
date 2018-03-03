import { Component, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// CDK
import { DataSource } from '@angular/cdk/table';
// Material
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// Firebase
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';

// RxJS
import { Observable } from 'rxjs/Observable';

// Constant
import { DB_COL } from '../../../constants';

// Service
import { UsersService } from '../users.service';

// data structure definition
export class IUsersTableData {
  $key: string;
  email: string;
  photoURL: string;
  displayName?: string;
  username?: string;
  regDate?: string;
  isActive: boolean;
  role: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements AfterViewInit {

  displayedColumns = [
    'isActive',
    'photoURL',
    'displayName',
    'username',
    'email',
    'role',
    'regDate',
  ];

  usersDataSource: MatTableDataSource<IUsersTableData> | null;
  users: Observable<{}[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    afDb: AngularFireDatabase,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    // initializes users db collection
    this.users = afDb.list(DB_COL.USERS).valueChanges();
    // creates new DataSource Table
    this.usersDataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    // update paginator and sort control
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    // subscribe to users fdb collection
    this.users.subscribe(users => {
      // console.log("users", users);
      // initialize empty array for Users List
      const usersList: IUsersTableData[] = [];
      users.forEach(i => {
        const user = new IUsersTableData();
        user.$key = i['uid'],
        user.isActive = i['isActive'],
        user.photoURL = i['photoURL'],
        user.displayName = i['displayName'],
        user.username = i['username'],
        user.email = i['email'],
        user.role = i['role'],
        user.regDate = i['regDate'],
        usersList.push(user);
      });
      // Fix for filter reset when databse changes
      this.usersDataSource.data = usersList;
      // Fix for ExpressionChangedAfterItHasBeenCheckedError
      // this.cdr.detectChanges();
    });
  }

  // filtering function helper
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.usersDataSource.filter = filterValue;
  }

  // navigates to Add New User Page
  goToAddNewUser() {
    this.router.navigate(['Ïadmin/users/add']);
  }

  // navigates to Selected User Details Page
  goToUserDetails(key: string) {
    this.router.navigate(['admin/users/edit/' + key]);
  }

}
