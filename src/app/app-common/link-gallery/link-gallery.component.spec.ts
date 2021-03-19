import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGalleryComponent } from './link-gallery.component';

describe('LinkGalleryComponent', () => {
  let component: LinkGalleryComponent;
  let fixture: ComponentFixture<LinkGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkGalleryComponent ]
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
