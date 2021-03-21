import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGalleryComponent } from './link-gallery.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';

describe('LinkGalleryComponent', () => {
  let component: LinkGalleryComponent;
  let fixture: ComponentFixture<LinkGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkGalleryComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
