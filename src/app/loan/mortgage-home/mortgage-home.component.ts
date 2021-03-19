import { Component, OnInit } from '@angular/core';
import {LinkGalleryItem} from '../../app-common/model/link-gallery-item';

@Component({
  selector: 'app-mortgage-home',
  templateUrl: './mortgage-home.component.html',
  styleUrls: ['./mortgage-home.component.scss']
})
export class MortgageHomeComponent implements OnInit {

  public linkGalleryItems: LinkGalleryItem[] = [
    {
      url: 'mortgage-calculator',
      name: 'Mortgage Calculator',
      description: 'Calculate your mortgage payments.',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.mortgagecalculator.org%2Fimages%2Fmortgage-stats.jpg&f=1&nofb=1',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
