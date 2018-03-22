import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

// Articles Routes
const articlesRoutes = [
  { path: '', component: ArticlesListComponent },
  { path: 'edit-article/:id', component: EditArticleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(articlesRoutes)
  ],
  declarations: []
})
export class ArticlesRoutingModule { }
