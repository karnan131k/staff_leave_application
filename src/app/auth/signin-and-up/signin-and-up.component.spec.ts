import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAndUpComponent } from './signin-and-up.component';

describe('SigninAndUpComponent', () => {
  let component: SigninAndUpComponent;
  let fixture: ComponentFixture<SigninAndUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninAndUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninAndUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
