import { TestBed } from '@angular/core/testing';

import { StoreNameServiceService } from './store-name-service.service';

describe('StoreNameServiceService', () => {
  let service: StoreNameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreNameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
