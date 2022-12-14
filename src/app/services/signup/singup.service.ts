import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private api: ApiService) { }

  getReferceListDatas(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }

  getGstDetails(gstNo) {
    return this.api.getGstData(gstNo);
  }

  registerDetails(data) {
    return this.api.post('Customer', data);
  }

  addUser(userReq) {
    return this.api.post('User/', userReq);
  }

  getLorryOwnerRole() {
    return this.api.get('role/GetRolebyName/?name=LorryOwner');
  }
  updateLorryLocation(vehicleId, req) {
    return this.api.put(`vehicle/PutLiveLocation/?id=${vehicleId}`, req);
  }
}
