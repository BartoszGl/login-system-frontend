import { TestBed } from '@angular/core/testing';

import { VerifyEmailGuard } from './shared/guards/verify-email.guard';

describe('VerifyEmailGuard', () => {
  let guard: VerifyEmailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifyEmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
