import { Injectable } from '@angular/core';


import {Headers, Http} from '@angular/http';

import { Observable }     from 'rxjs/Observable';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

let listPayerType = {
  modelName: "Common",
  calledMethod: "getTypesOfPayers",
  methodProperties: {},
  apiKey: ""
}

let listPaymentMethod = {
  modelName: "Common",
  calledMethod: "getPaymentForms",
  methodProperties: {},
  apiKey: ""
}

let listCargoType = {
  modelName: "Common",
  calledMethod: "getCargoTypes",
  methodProperties: {},
  apiKey: ""
}

let listServiceType = {
  modelName: "Common",
  calledMethod: "getServiceTypes",
  methodProperties: {},
  apiKey: ""
}

let listCity = {
  modelName: "Address",
  calledMethod: "searchSettlements",
  methodProperties: {
      CityName: "",
      Limit: "10"
  },
  apiKey: ""
}

let listSender = {
   modelName: "Counterparty",
   calledMethod: "getCounterparties",
   methodProperties: {
       CounterpartyProperty: "Sender",
       Page: "1"
   },
   apiKey: ""
}


let listRecipient = {

   modelName: "Counterparty",
   calledMethod: "getCounterparties",
   methodProperties: {
     CounterpartyProperty: "Recipient",
     Page: "1"
   },
   apiKey: ""
}




let listAddress = {
    modelName: "Address",
    calledMethod: "getStreet",
    methodProperties: {
      FindByString: "",
      CityRef: "",
      Limit: 10
    },
    apiKey: ""
  }


let listContragent = {
   modelName: "Counterparty",
   calledMethod: "getCounterpartyContactPersons",
   methodProperties: {
     Ref: "",
     Page: "1"
   },
   apiKey: ""
}


let createAddressContragentBody = {
  modelName: "Address",
  calledMethod: "save",
  methodProperties: {
    CounterpartyRef: "",
    StreetRef: "",
    BuildingNumber: "",
    Flat: "",
    Note: ""
  },
  apiKey: ""
}

let bodyEN  = {
  modelName: "InternetDocument",
  calledMethod: "save",
  methodProperties: {},
  apiKey: ""
}


@Injectable()
export class CatalogueService {
  private EIUrl = 'https://api.novaposhta.ua/v2.0/json/';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

  public apiKey:any =  null;

 writeApiKey(key : string):any {
   this.apiKey = key;
   console.log(this.apiKey);
 }

 writeKeyApiToObj(Obj: any) {
   Obj['apiKey'] = this.apiKey;

 }



 createPOST(URL:string,JSONObject:any,headerObject:any,observeOrPromise?:string): any {
   this.writeKeyApiToObj(JSONObject);
   if (observeOrPromise === 'observe') {
     return this.http
     .post(URL, JSON.stringify(JSONObject), {headers: headerObject})
     .map(response => response.json().data as any)
   }
   else {
     return this.http
     .post(URL, JSON.stringify(JSONObject), {headers: headerObject})
     .toPromise()
     .then(response => response.json().data as any)
   }
 }



//Обсервері не работаю надо изменить то промис, на map и еще доп посмотреть
// на сайте руководстве

  getPayerType(): Promise<any> {
      return this.createPOST(this.EIUrl,listPayerType,this.headers)
    } // stub

  getPaymentMethod(): Promise<any> {
      return this.createPOST(this.EIUrl,listPaymentMethod,this.headers)
    } //

  getCargoType(): Promise<any> {
    return this.createPOST(this.EIUrl,listCargoType,this.headers)
  }

  getServiceType(): Promise<any> {
    return this.createPOST(this.EIUrl,listServiceType,this.headers)
  }

  getSender(): Promise<any> {
    return this.createPOST(this.EIUrl,listSender,this.headers)
  }


  getContragent(refSender: any): Promise<any> {
      console.log("Service",refSender);
      listContragent["methodProperties"]["Ref"] = refSender
      return this.createPOST(this.EIUrl,listContragent,this.headers)
    } //




  getCitySenderService(city: any): Observable<any> {
    listCity["methodProperties"]["CityName"] = city;
    return this.createPOST(this.EIUrl,listCity,this.headers,'observe')
    .map((data:any) => data['0'].Addresses as any)
  }


  getCityRecipientService(city: any): Observable<any> {
    listCity["methodProperties"]["CityName"] = city;
    return this.createPOST(this.EIUrl,listCity,this.headers,'observe')
    .map((data:any) => data['0'].Addresses as any)
  }


  createAddress(address: any, city: any): Observable<any> {
    console.log('listAddressSEN',listAddress);
    listAddress["methodProperties"]["CityRef"] = city[2];
    listAddress["methodProperties"]["FindByString"] = address;
    return this.createPOST(this.EIUrl,listAddress,this.headers,'observe')
      }

  createAddressRecipient(address: any, city: any): Observable<any> {
    console.log('listAddressREC',listAddress);
    listAddress["methodProperties"]["CityRef"] = city[2];
    listAddress["methodProperties"]["FindByString"] = address;
    return this.createPOST(this.EIUrl,listAddress,this.headers,'observe')
      }

    private handleError(error: any) {
          return Observable.throw(error.json().error || 'Server Error');
      }


      getRecipient(): Promise<any> {
        return this.createPOST(this.EIUrl,listRecipient,this.headers)
      }


      createAddressContragentService(CounterpartyRef: string,StreetRef: string ,BuildingNumber: string): Promise<any>{
        createAddressContragentBody["methodProperties"]["CounterpartyRef"] = CounterpartyRef
        createAddressContragentBody["methodProperties"]["StreetRef"]  = StreetRef
        createAddressContragentBody["methodProperties"]["BuildingNumber"] = BuildingNumber
        return this.createPOST(this.EIUrl,createAddressContragentBody,this.headers)
      }


      createEN(body: any): Promise<any> {
          bodyEN["methodProperties"] = body;
          console.log("MODEL",bodyEN,"MODEL")
          return this.createPOST(this.EIUrl,bodyEN,this.headers)
        } //

} // close CatalogueService
