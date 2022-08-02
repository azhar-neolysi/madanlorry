import { TestBed } from '@angular/core/testing';

import { BookingEnquiresService } from './booking-enquires.service';

describe('BookingEnquiresService', () => {
  let service: BookingEnquiresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingEnquiresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
