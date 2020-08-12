import { Component } from '@angular/core';
import { HttpService } from "./http.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TicTapper-app';
  constructor(private _http: HttpService){}
}
