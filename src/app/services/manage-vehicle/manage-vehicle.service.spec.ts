import { TestBed } from '@angular/core/testing';

import { ManageVehicleService } from './manage-vehicle.service';

describe('ManageVehicleService', () => {
  let service: ManageVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
