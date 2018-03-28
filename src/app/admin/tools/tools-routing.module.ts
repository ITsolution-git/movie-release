import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Components
import { ToolsComponent } from './tools.component';
// Articles Routes
const toolsRoutes = [
  { path: '', redirectTo: 'api-tool', pathMatch: 'full' },
  { path: 'api-tool', component: ToolsComponent },
  { path: 'duplicate-checker', component: ToolsComponent },
  { path: 'sitemap-genrator', component: ToolsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(toolsRoutes)
  ],
  declarations: []
})
export class ToolsRoutingModule { }
