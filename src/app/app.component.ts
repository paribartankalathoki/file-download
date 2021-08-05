import { HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'file-download';

  pdfFiles = [
    {
      name: 'PDF File One',
      id: 2,
      path: './assets/sample.pdf'
    },
    {
      name: 'PDF File Two',
      id: 4,
      path: './assets/sample.pdf'
    },
  ];

  constructor(
    private service: MainService
  ) {

  }

  ngOnInit() {
    const cid = 'SET_YOUR_CID';
    const signInTime = 'SET_YOUR_SIGNIN_TIME';
    const leaveingTime = 'SET_YOUR_SIGNOUT_TIME';
    const uid = 'SET_USER_ID';
    const accessToken = 'SET_JWT_ACCESS_TOKEN';
    const idToken = 'SET_JWT_ID_TOKEN';
    this.service.getEncodedResponseForDownload(cid, signInTime, leaveingTime, uid, accessToken, idToken).subscribe((data: HttpResponse<Blob>) => {
      const fileName = data.headers.get('content-disposition').split(' ')[1].split('=')[1];
      this.downloadFile(data.body, `${fileName}`);
    }, error => {
      console.log('error: ', error);
    });
  }
  downloadFile(pdfUrl, pdfName) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }

}
