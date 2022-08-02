import { TestBed } from '@angular/core/testing';

import { DriverInOutService } from './driver-in-out.service';

describe('DriverInOutService', () => {
  let service: DriverInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
