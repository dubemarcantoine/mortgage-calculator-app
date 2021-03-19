import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkGalleryComponent} from './link-gallery/link-gallery.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [LinkGalleryComponent],
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
