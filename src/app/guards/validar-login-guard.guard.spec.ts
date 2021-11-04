import { TestBed } from '@angular/core/testing';

import { ValidarLoginGuard } from './validar-login-guard.guard';

describe('ValidarLoginGuardGuard', () => {
  let guard: ValidarLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidarLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
