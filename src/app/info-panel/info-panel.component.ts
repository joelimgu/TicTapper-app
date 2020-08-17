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

  status:any = "Disconnected";
  qtyDone:any = 0;
  processSize:any = 0;
  jobName:any = "NA"
  msgTimeToProcessATag:any = "";
  isNFCConnected:any = false
  isDBConnected:any = false
  isThereAnError = false
  async ngOnInit() {

  this._updateStatus();
  }

  async _updateStatus(){ //updates all the info of the main pannel
    while (true) {//creates a while of delay 0.3s
      await this._delay(300);

      //updates the status info
      this._http.getStatus().then((status:any) =>{
        this.status = status.msg; //displays the status recieved on the page
        this.isThereAnError = status.isThereAnError;
       }).catch((err) => {this.status = err;})

      //updates the speed line if it makes sense to do so
      this._http.getSpeed().then((finishedTime) =>{
        if(this.status != "Looking for a Job") this._displayTagTime(finishedTime)
        else this.msgTimeToProcessATag = "╰(*°▽°*)╯"
      }).catch((err) => { console.log(err); })

      //updates the rectangle color to info the user about the connections status
      this._http.getNFCInfo().then((connection) => {this.isNFCConnected = connection}).catch((err) => {console.log(err) })
      this._http.getNFCInfo().then((connection) => {this.isDBConnected = connection}).catch((err) => {console.log(err) })

      //takes care of the job info in the main panel
      this._http.getcurrentJob().then((currentJob:any) =>{
        if (currentJob){
          this.qtyDone = Math.min(currentJob.qtydone + 1, this.processSize);
          this.processSize = currentJob.qty
          this.jobName = currentJob.name
        }
      }).catch((err) => {console.log(err);})
    }
  }

  //creates the msg for the speed info
  _displayTagTime(time){
    this.msgTimeToProcessATag = "S'ha tardat " + time/1000 +"s en escriure una etiqueta, acabant la tasca en " +  ((time*(this.processSize - this.qtyDone))/1000) + "s";
  }

  //dely funciton
  _delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //method to update the db in use
  updateDb(event){
    if (this.status != "Looking for a Job") alert("La base de dades serà actualitzada una vegada la feina actual hagi finalitzat")
    this._http.updateDB(event.target.value);
  }

  //routes to the page to add a job to the db
  goToCreateNewJob(){
    this._router.navigate(['CreateNewJob'])
  }

  acceptTag(){
      this._http.sendOrder("Save tag");
  }

  rejectTag(){
      this._http.sendOrder("Reject tag");
  }
}
