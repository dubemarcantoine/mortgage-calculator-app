import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkGalleryComponent} from './link-gallery/link-gallery.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [LinkGalleryComponent, PageNotFoundComponent],
  exports: [
    LinkGalleryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
  ]
})
export class AppCommonModule {
}
