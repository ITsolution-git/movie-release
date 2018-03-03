import { TestBed, inject } from '@angular/core/testing';

import { AdminRoleGuardService } from './admin-role-guard.service';

describe('AdminRoleGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRoleGuardService]
    });
  });

  it('should be created', inject([AdminRoleGuardService], (service: AdminRoleGuardService) => {
    expect(service).toBeTruthy();
  }));
});
