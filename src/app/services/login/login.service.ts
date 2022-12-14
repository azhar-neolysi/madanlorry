import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: ApiService) { }

  login(username, id, phonenumber, pass) {
    return this.api.get('User/GetLogin/?username=' + username + '&email=' + id + '&mobile=' + phonenumber + '&password=' + pass);
  }

}
