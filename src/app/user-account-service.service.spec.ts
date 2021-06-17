import { TestBed } from '@angular/core/testing';

import { UserAccountServiceService } from './shared/directives/service/user-account-service.service';

describe('UserAccountServiceService', () => {
  let service: UserAccountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
