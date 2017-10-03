import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EI } from './ei';
import { EIService } from './ei.service';


@Component({
  selector: 'my-eis',
  template: `
    <ol class="eis">
      <li *ngFor="let ei of eis"
      [class.selected]="ei === selectedEI"
      (click)="onSelect(ei)">
      <span>Идентификатор ЭН: </span><p>{{ei.Ref}}</p>
      <p></p>
      </li>
    </ol>
    <div *ngIf="selectedEI">
    <button (click)="gotoDetail()">Посмотреть детали ЕН</button>
    <button>Создать ЕН</button>
    </div>
  `,
  styles: [`
    li { border: 2px solid black}
    li:hover { background: grey; color: white}
    `]
})

export class EISComponent implements OnInit   {
  title = 'Post API';
  eis : EI[];
  selectedEI: EI;
  results: string[];

  constructor(
    private router: Router,
    private eiService: EIService) { }

  getEIs(): void {
  this.eiService.getEIs().then(eis =>   this.eis = eis);
  }

  ngOnInit(): void {
  this.getEIs();
}

  onSelect(ei: EI): void {
  this.selectedEI = ei;
}

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedEI.Ref]);
  }
}
