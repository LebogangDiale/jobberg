import { TestBed } from '@angular/core/testing';

import { DeactivateAccountService } from './deactivate-account.service';

describe('DeactivateAccountService', () => {
  let service: DeactivateAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeactivateAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
