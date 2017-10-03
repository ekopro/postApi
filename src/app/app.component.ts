import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <a routerLink="/eis">EIS</a>
  <a routerLink="/create">Create EN</a>
 <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'EIs';
}
