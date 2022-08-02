import { TestBed } from '@angular/core/testing';

import { ManageDriverService } from './manage-driver.service';

describe('ManageDriverService', () => {
  let service: ManageDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
