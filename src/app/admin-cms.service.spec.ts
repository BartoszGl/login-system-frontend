import { TestBed } from '@angular/core/testing';

import { AdminCmsService } from './shared/service/admin-cms.service';

describe('AdminCmsService', () => {
  let service: AdminCmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
