import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class apiService {
  // SET URL STRING FOR API CALL
  // url: string = 'https://ineowebm7.azurewebsites.net/api/UnlockApis';
  url: string = 'https://portal2.ineotech.com/ineoM7reference/api/UnlockApis';
  body: Array<any> = [];

  // SET HTTP TO PRIVATE
  constructor(private _http: Http) {}

  // GET LOCK RESOURCES
  getLocked() {
    // set observable
    return this._http.get(this.url).map((res) => res.json());
  }

  // POST to UNLOCK RESOURCES
  postUnlock(locked) {
    return locked.forEach((lock) => {
      let headers = new Headers();
      headers.append( 'Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      let newBody = JSON.stringify(lock);
      let auth = lock.AuthID;
      let form = lock.FormName;
      let options = new RequestOptions({ headers: headers, method: 'post', body: newBody });
      let newUrl = this.url + `?authid=${auth}&formname=${form}`;
      console.log(newUrl);
      // POST to URL
      return this._http.post(newUrl, options).map((res )=> res.json());
    });
  }

}
