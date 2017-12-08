import { TestBed, inject } from '@angular/core/testing';

import { FirmApiService } from './firm-api.service';

describe('FirmApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirmApiService]
    });
  });

  it('should be created', inject([FirmApiService], (service: FirmApiService) => {
    expect(service).toBeTruthy();
  }));
});
