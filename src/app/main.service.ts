import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseAPI = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getEncodedResponseForDownload(cid: string, signInTime: string, leaveingTime: string, uid: string, accessToken: string, idToken: string) {
    // set params as per your requirement
    let params = new HttpParams();
    params = params.append('customerId', cid);
    params = params.append('signInDateTimeEnd', signInTime);
    params = params.append('signInDateTimeStart', leaveingTime);
    params = params.append('userId', uid);

    // set http headers as per needed
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Accept', 'application/json');

    /**
     * Note: you can set header using interceptor, here i added manually
     */

    headers = headers.append('accessToken', accessToken);
    headers = headers.append('idToken', idToken);
    headers = headers.append('customerId', cid);
    headers = headers.append('userId', uid);

    return this.httpClient.get(`${this.baseAPI}`, { headers, responseType: 'blob', observe: 'response' });

  }
}
