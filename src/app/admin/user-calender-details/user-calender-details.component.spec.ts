import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCalenderDetailsComponent } from './user-calender-details.component';

describe('UserCalenderDetailsComponent', () => {
  let component: UserCalenderDetailsComponent;
  let fixture: ComponentFixture<UserCalenderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCalenderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCalenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
