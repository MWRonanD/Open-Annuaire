import { TestBed, inject } from '@angular/core/testing';

import { SendCompanyService } from './send-company.service';

describe('SendCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendCompanyService]
    });
  });

  it('should be created', inject([SendCompanyService], (service: SendCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
