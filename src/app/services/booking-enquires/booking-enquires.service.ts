import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingEnquiresService {

  constructor(private api: ApiService) { }

  getAllBookingEnq(ownerId) {
    return this.api.get('VehicleBookingEnqResponse/GetBookingEnqDetails/?name=VES&transporterId=' + ownerId);
  }
  submitResponse(responseJson) {
    return this.api.put('VehicleBookingEnqResponse/PutBookingEnqFeedback/?id=' + responseJson.VehicleBookingEnqResponseId, responseJson);
  }
}
