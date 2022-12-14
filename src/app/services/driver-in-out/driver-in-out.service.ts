import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DriverInOutService {

  constructor(private api: ApiService) { }
  getdriverInOut(transpoterId) {
    return this.api.get('DriverInOut/GetDriverInOutDetails/?cid=' + transpoterId);
  }
  getDrivers(transpoterId) {
    return this.api.get('Driver/GetDriverDetails?cid=' + transpoterId);
  }
  getVehicles(transpoterId) {
    return this.api.get('Vehicle/GetVehicleDetails/?cid=' + transpoterId);
  }
  getInOutDetail(driverId) {
    return this.api.get(this.api.formUrl('DriverInOut', driverId));
  }
  editInOut(inOutDetails, driverId) {
    return this.api.put(this.api.formUrl('DriverInOut', driverId), inOutDetails);
  }
  saveInOut(inOutDetails) {
    return this.api.post('DriverInOut', inOutDetails);
  }
  deleteInOut(inOutDetails, driverId) {
    return this.api.delete(this.api.formUrl('DriverInOut', driverId), inOutDetails);
  }
}
