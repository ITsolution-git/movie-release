import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

// Users Routes
const usersRoutes = [
  { path: '', component: UsersListComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'add', component: AddUserComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes)
  ],
  declarations: []
})
export class UsersRoutingModule { }
