import { Component, OnInit, OnChanges, SimpleChanges,Input } from '@angular/core';


import { Observable }     from 'rxjs/Observable';
import { Subject }        from 'rxjs/Subject';
import { Location }                 from '@angular/common';



import { createEI }    from './ei-create';
import { CatalogueService } from './catalogue.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'ei-create',
  templateUrl: './refactor_create-form.html',
  styleUrls: [ './ei-create-search.component.css' ]
})
export class EICreateFormComponent implements OnInit, OnChanges {
  @Input() myApi: string;
  cities: Observable<any>;
  addresses: Observable<any>;
  citiesRecipient : Observable<any>;
  addressesRecipient: Observable<any>;
  private searchCitySenderTerms = new Subject<any>();
  private searchAddressTerms = new Subject<any>();
  private searchCityRecipientTerms = new Subject<any>();
  private searchAddressRecipientTerms = new Subject<any>();
  api  = {};
  model = {
    PayerType:"",
    PaymentMethod: "",
    DateTime: "",
    CargoType: "",
    VolumeGeneral: "",
    Weight: "",
    ServiceType: "",
    SeatsAmount: "",
    Description: "",
    Cost: "",
    CitySender: "",
    Sender: "",
    SenderAddress: "",
    ContactSender: "",
    SendersPhone: "",
    CityRecipient: "",
    Recipient: "",
    RecipientAddress: "",
    ContactRecipient: "",
    RecipientsPhone: "",
  };
  citySender: any ;
  cityRecipient: any;
  address : any;
  recipientAddress: any;
  sender : string;
  recipient: string;
  newEN: any;
  dataReceive: any;


  constructor(private catalogueService : CatalogueService,
              private location: Location) { }

  search(term: string): void {
    this.searchCitySenderTerms.next(term);
  }

  searchCityRecipient(term:string): void {
    this.searchCityRecipientTerms.next(term);
  }

  searchAddress(term : string): void {
    this.searchAddressTerms.next(term);
  }


  searchAddressRecipient(term: string): void {
    this.searchAddressRecipientTerms.next(term);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.cities = this.searchCitySenderTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term  // switch to new observable each time the term changes
        // return the http search observable
        ? this.catalogueService.getCitySenderService(term)
        : Observable.of<any>([]))
      .catch(error => {
        // TODO: add real error handling
        return Observable.of<any>([]);
      });



      this.addresses = this.searchAddressTerms.
      debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term  // switch to new observable each time the term changes
        // return the http search observable
        ? this.catalogueService.createAddress(term, this.citySender)
        : Observable.of<any>([]))
      .catch(error => {
        // TODO: add real error handling
        return Observable.of<any>([]);
      });


      this.citiesRecipient = this.searchCityRecipientTerms
        .debounceTime(300)        // wait 300ms after each keystroke before considering the term
        .distinctUntilChanged()   // ignore if next search term is same as previous
        .switchMap(term => term  // switch to new observable each time the term changes
          // return the http search observable
          ? this.catalogueService.getCityRecipientService(term)
          : Observable.of<any>([]))
        .catch(error => {
          // TODO: add real error handling
          return Observable.of<any>([]);
        });

        this.addressesRecipient = this.searchAddressRecipientTerms
          .debounceTime(300)        // wait 300ms after each keystroke before considering the term
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term  // switch to new observable each time the term changes
            // return the http search observable
            ? this.catalogueService.createAddressRecipient(term, this.cityRecipient)
            : Observable.of<any>([]))
          .catch(error => {
            // TODO: add real error handling
            return Observable.of<any>([]);
          });


  }

  payers  =  this.getPayerType();
  payments = this.getPaymentMethod();
  cargos = this.getCargoType();
  services = this.getServiceType();
  senders = this.getSender();
  recipients = this.getRecipient();

  writeApiKey(key:string) {
    event.preventDefault();
    this.catalogueService.writeApiKey(key);
  }


  getPayerType():Promise<any> {
    return this.catalogueService.getPayerType()
    .then(data => {
            return data;
        });
  }

    getPaymentMethod():Promise<any> {
      return this.catalogueService.getPaymentMethod()
      .then(data => {
              return data;
          });
    }

    getCargoType():Promise<any> {
      return this.catalogueService.getCargoType()
      .then(data => {
              return data;
          });
    }

    getServiceType():Promise<any> {
      return this.catalogueService.getServiceType()
      .then(data => {
              return data;
          });
    }


    getSender():Promise<any> {
      return this.catalogueService.getSender()
      .then(data => {
              return data;
          });
    }

    getContragent(value: any):Promise<any> {
      console.log(value.substring(3));
      return this.catalogueService.getContragent(value.substring(3))
      .then(data => {
              return data;
          });
    }

    writeCity(city: any, SenderOrRecipient: string):void {
      console.log(city);
      if (SenderOrRecipient === "sender") {
        return this.model.CitySender = city[2], this.citySender = city;
      }
      else if (SenderOrRecipient === "recipient") {
        return this.model.CityRecipient = city[2], this.cityRecipient = city;
      }
    }

    writeAddressSender(address: any,SenderOrRecipient: string):void {
      console.log(address);
      if (SenderOrRecipient === "sender") {
        return this.model.SenderAddress = address[1],this.address = address;
      }
      else if (SenderOrRecipient === "recipient") {
        return this.model.RecipientAddress = address[1],this.recipientAddress = address;
      }
    }

    getRecipient():Promise<any> {
      return this.catalogueService.getRecipient()
      .then(data => {
              return data;
          });
    }


    onChangeRecipient(value: any):void {
      console.log(value);
      console.log(value.Description);
      console.log(value.Phones);
      this.model.RecipientsPhone = value.Phones;
      this.model.ContactRecipient = value.Description;
    }

    onChangeSender(value: any):void {
      console.log(value);
      console.log(value.Description);
      console.log(value.Phones);
      this.model.SendersPhone = value.Phones;
      this.model.ContactSender = value.Description;
    }

  submitted = false;

  goBack(): void {
    this.location.back();
  }

  isEmptyObject(emptyObject: any){
    return JSON.stringify(emptyObject) === '{}';
  }


  createJSON(model: any) {
    if (model.RecipientAddress||model.StreetNumRecipient||model.StreetNumRecipient) {
      let createJSON1 : [Promise<void>,Promise<void>] = [
        this.catalogueService.createAddressContragentService(
        model.Recipient,
        model.RecipientAddress,
        model.StreetNumRecipient,
        ),
        this.catalogueService.createAddressContragentService(
          model.Sender,
          model.SenderAddress,
          model.StreetNum,
          )
      ];
      Promise.all(createJSON1)
      .then((data) => {
        console.log('DATA = PROMISE<ADDRESS>',data)
        let Recipient = data[0];
        let Sender = data[1];
        console.log('DATA2[]',Sender,Recipient,'DATA2[]')
        this.newEN.SenderAddress = Sender[0].Ref
        this.newEN.RecipientAddress = Recipient[0].Ref
        console.log('this.newEN.SenderAddress',this.newEN.SenderAddress);
        console.log('this.newEN.RecipientAddress',this.newEN.RecipientAddress);
      }).then((data) => {
        this.catalogueService.createEN(model);
        console.log(model);
      });
    }
    else {
      console.log("свойства не заполнены");
    }
  }



  onSubmit() {
    event.preventDefault();
    this.submitted = true;
    this.newEN = this.model;
    this.createJSON(this.newEN);
    // this.goBack();

  }

}
