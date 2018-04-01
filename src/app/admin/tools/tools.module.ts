import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatIconModule, MatTabsModule, MatButtonModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
// Routing Module
import { ToolsRoutingModule } from './tools-routing.module';
// Components
import { DuplicateCheckerToolComponent } from './duplicate-checker-tool/duplicate-checker-tool.component';
import { SitemapsGeneratorToolComponent } from './sitemaps-generator-tool/sitemaps-generator-tool.component';
import { ToolsComponent } from './tools.component';
import { ApiToolsComponent } from './api-tools/api-tools.component';
@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ],
  declarations: [
    ApiToolsComponent,
    DuplicateCheckerToolComponent,
    SitemapsGeneratorToolComponent,
    ToolsComponent
  ]
})
export class ToolsModule { }
