import { TestBed } from '@angular/core/testing';

import { SigninAndSignupService } from './signin-and-signup.service';

describe('SigninAndSignupService', () => {
  let service: SigninAndSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninAndSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
