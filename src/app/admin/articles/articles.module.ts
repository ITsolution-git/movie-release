import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing Module
import { ArticlesRoutingModule } from "./articles-routing.module";

// Components
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

@NgModule({
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ],
  declarations: [
    AddArticleComponent,
    EditArticleComponent,
    ArticlesListComponent
  ]
})
export class ArticlesModule { }
