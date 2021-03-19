import {Component, Input, OnInit} from '@angular/core';
import {LinkGalleryItem} from '../model/link-gallery-item';

@Component({
  selector: 'app-link-gallery',
  templateUrl: './link-gallery.component.html',
  styleUrls: ['./link-gallery.component.scss']
})
export class LinkGalleryComponent implements OnInit {

  @Input()
  public items: LinkGalleryItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
