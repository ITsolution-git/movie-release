import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';
// WYSIWYG Editor
import { CKEditorModule } from 'ng2-ckeditor';
// Routing Module
import { ArticlesRoutingModule } from "./articles-routing.module";
// Components
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { DeleteArticleDialogComponent } from './delete-article-dialog/delete-article-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule
  ],
  declarations: [
    AddArticleComponent,
    EditArticleComponent,
    ArticlesListComponent,
    DeleteArticleDialogComponent,
  ],
  entryComponents: [
    DeleteArticleDialogComponent
  ]
})
export class ArticlesModule { }
