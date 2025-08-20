import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavBook } from './add-to-fav-book';

describe('AddToFavBook', () => {
  let component: AddToFavBook;
  let fixture: ComponentFixture<AddToFavBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFavBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToFavBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
