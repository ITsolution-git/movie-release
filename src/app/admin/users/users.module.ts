import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';
// Routing Module
import { UsersRoutingModule } from './users-routing.module';

// Service
import { UsersService } from './users.service';

// Components
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserDialogComponent } from './edit-user/delete-user-dialog/delete-user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    UsersListComponent,
    AddUserComponent,
    EditUserComponent
  ],
  // entryComponents: [
  //   DeleteUserDialogComponent
  // ],
  providers: [UsersService]
})
export class UsersModule { }
