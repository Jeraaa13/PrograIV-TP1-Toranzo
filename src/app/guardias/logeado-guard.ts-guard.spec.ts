import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logeadoGuardTsGuard } from './logeado-guard.ts-guard';

describe('logeadoGuardTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => logeadoGuardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
