import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { EI } from './ei';
import { EIService }  from './ei.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ei-detail',
  templateUrl: './ei-detail.component.html',
})
export class EIDetailComponent implements OnInit{

  constructor(
  private eiService: EIService,
  private route: ActivatedRoute,
  private location: Location,
  ) {}


  @Input() ei: EI;

  ngOnInit(): void {
  this.route.paramMap
    .switchMap((params: ParamMap) => this.eiService.getEI(params.get('Ref')))
    .subscribe(ei => this.ei = ei);
  }

  goBack(): void {
    this.location.back();
  }

  del(): void {
    this.eiService.del(this.ei.Ref)
    .then(() => this.goBack());
  }


}
