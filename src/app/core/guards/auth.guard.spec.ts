import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { MocksModule } from 'src/app/core/testing/mocks.module';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Storage } from '@ionic/storage';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ MocksModule ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user logged', inject([Storage], async (storage: Storage) => {
    spyOn(authService, 'getToken').and.returnValue(new Promise((resolve) => resolve('token')));
    await storage.set('token', 'token');
    expect(await guard.canActivate()).toEqual(true);
  }));

  it('should return false if user do not logged', inject([Storage], async (storage: Storage) => {
    spyOn(authService, 'getToken').and.returnValue(new Promise((resolve) => resolve(null)));
    await storage.set('token', 'token');
    expect(await guard.canActivate()).toEqual(false)
  }));

  it('should return true', async () => {
    spyOn(guard, 'canActivate').and.returnValue(new Promise((resolve) => resolve(true)));
    const result = await guard.canActivate();
    expect(result).toEqual(true);
  });

  it('should return false', async () => {
    spyOn(guard, 'canActivate').and.returnValue(new Promise((resolve) => resolve(false)));
    const result = await guard.canActivate();
    expect(result).toEqual(false);
  });

  it('should return true', async () => {
    spyOn(guard, 'canActivate').and.returnValue(new Promise((resolve) => resolve(true)));
    const result = await guard.canActivate();
    expect(result).toEqual(true);
  });

  it('should return false', async () => {
    spyOn(guard, 'canActivate').and.returnValue(new Promise((resolve) => resolve(false)));
    const result = await guard.canActivate();
    expect(result).toEqual(false);
  });

});
