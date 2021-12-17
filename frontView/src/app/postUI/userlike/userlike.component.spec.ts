import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlikeComponent } from './userlike.component';

describe('UserlikeComponent', () => {
  let component: UserlikeComponent;
  let fixture: ComponentFixture<UserlikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
