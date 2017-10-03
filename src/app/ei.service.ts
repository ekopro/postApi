import { Injectable } from '@angular/core';
import { EI } from './ei';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

let date = /\//gi
let displayDate = new Date().toLocaleDateString().replace(date,".");


let body  = {
    "modelName": "InternetDocument",
    "calledMethod": "getDocumentList",
    "methodProperties": {
      "DateTimeFrom": "21.06.2016",
      "DateTimeTo": displayDate,
        "Page": "1",
        "GetFullList": "0"
    },
    "apiKey": "a38fe9c65b1f7c3e14062a1628a89740"
}


@Injectable()
export class EIService {
  private EIUrl = 'https://api.novaposhta.ua/v2.0/json/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

   getEIs(): Promise<EI[]> {
     return this.http
    .post(this.EIUrl, body, {headers: this.headers})
    .toPromise()
    .then(response => response.json().data as EI[])
    .catch(this.handleError);
   } // stub

   getEI(Ref: string): Promise<EI> {
      return this.getEIs()
                 .then(eis => eis.find(ei => ei.Ref === Ref))
                 .catch(this.handleError);
   }

   del(Ref: string): Promise<any> {

     let bodyDelete  = {
         "apiKey": "a38fe9c65b1f7c3e14062a1628a89740",
         "modelName": "InternetDocument",
         "calledMethod": "delete",
         "methodProperties": {
         "DocumentRefs": ""
       }
     };

     bodyDelete["methodProperties"]["DocumentRefs"] = Ref;
     console.log(bodyDelete);
     return this.http.post(this.EIUrl, JSON.stringify(bodyDelete),{headers: this.headers})
            .toPromise()
            .then(res => res.json().data as any)
            .catch(this.handleError);
    }



   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
