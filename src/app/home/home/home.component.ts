import { Component, OnInit } from '@angular/core';
import {LinkGalleryItem} from '../../app-common/model/link-gallery-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public linkGalleryItems: LinkGalleryItem[] = [
    {
      url: '/loans',
      name: 'Loans',
      description: 'Have a look at our loans.',
      imageUrl: 'http://www.globalbusinesslending.com/wp-content/uploads/2015/12/unsecured-loan.jpg',
    },
    {
      url: '/credit-cards',
      name: 'Credit Cards',
      description: 'Have a look at our credit cards.',
      imageUrl: 'http://a.abcnews.go.com/images/Business/GTY-credit_cards_thg-13071889687181_16x9_992.jpg',
    },
    {
      url: '/brokerage',
      name: 'Online brokerage',
      description: 'Our online brokerage solutions.',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F539643%2Fgetty-stock-market-rising.jpg&f=1&nofb=1',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
