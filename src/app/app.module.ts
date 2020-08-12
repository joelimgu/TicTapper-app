import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { LastJobInfoComponent } from './last-job-info/last-job-info.component';
import { CreateNewJobComponent } from './create-new-job/create-new-job.component';

import { HttpService } from "./http.service";

@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    TitleBarComponent,
    LastJobInfoComponent,
    CreateNewJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
