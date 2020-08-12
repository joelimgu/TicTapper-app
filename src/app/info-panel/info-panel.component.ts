import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  constructor(private _router: Router, private _http: HttpService) { }

  status = "Disconnected";
  qtyDone = 0;
  processSize = 0;
  jobName = "NA"
  msgTimeToProcessATag = "";
  async ngOnInit() {
  //  let a = await this._http.getStatus();
  //  console.log("h: " + a);
  this._updateStatus();
  }

  async _updateStatus(){
    while (true) {
      await this._delay(300);
      let status = "Disconnected"
      let currentJob = {qtydone: 0, qty: 0, name: "NA"}
      let finishedTime = 0;
      try {
        status = await this._http.getStatus();
        currentJob = await this._http.getcurrentJob();
        finishedTime = await this._http.getSpeed();
      } catch (error) {
        console.log("can't connect to http server, error : " + error);
      }
      this._displayTagTime(finishedTime)
      this.status = status
      this.qtyDone = currentJob.qtydone + 1
      this.processSize = currentJob.qty
      this.jobName = currentJob.name
    }
  }

  _displayTagTime(time){
    this.timeToProcessATag = "S'ha tardat " + time/1000 +"s en escriure una etiqueta, acabant la tasca en " +  ((time*(this.processSize - this.qtyDone))/1000) + "s";
  }

  _delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  updateDb(event){
    if (this.status != "Looking for a Job") alert("La base de dades serà actualitzada una vegada la feina actual hagi finalitzat")
    this._http.updateDB(event.target.value);
  }

  goToCreateNewJob(){
    this._router.navigate(['CreateNewJob'])
  }
}
