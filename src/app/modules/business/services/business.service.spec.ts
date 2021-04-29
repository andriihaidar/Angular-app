import { TestBed } from '@angular/core/testing';

import { BusinessService } from './business.service';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('BusinessService', () => {
  let service: BusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MocksModule ]
    });
    service = TestBed.inject(BusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
