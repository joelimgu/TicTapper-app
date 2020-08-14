import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../http.service";
import { IJob } from "../interfaces/JobInterface";

@Component({
  selector: 'app-create-new-job',
  templateUrl: './create-new-job.component.html',
  styleUrls: ['./create-new-job.component.scss']
})
export class CreateNewJobComponent implements OnInit {

  newJob : any = {};

  constructor(private _router: Router,  private _http: HttpService) { }

  ngOnInit() {
  }

  addNewJob(){
    console.log(this.newJob.qtyDone);

    if (this.newJob.name && this.newJob.ref && this.newJob.pre_url && this.newJob.qty && (this.newJob.qtyDone || this.newJob.qtyDone == 0) && this.newJob.rom && this.newJob.status){
      this._http.insertNewJob(this.newJob);
      this.goToHomePage();
    } else{
      alert("Algun camp de la nova tasca està en blanc, acabeu de emplenar-lo i torneu a provar")
    }

  }

  setName(event){
    this.newJob.name = event.target.value;
  }

  setRef(event){
    this.newJob.ref = event.target.value;
  }

  setURL(event){
    this.newJob.pre_url = event.target.value;
  }

  setQty(event){
    this.newJob.qty = event.target.value;
  }

  setQtDone(event){
    this.newJob.qtyDone = event.target.value;
  }

  setRom(event){
    this.newJob.rom = event.target.value;
  }

  setStatus(event){
    this.newJob.status = event.target.value;
  }

  goToHomePage(){
    this._router.navigate(['/'])
  }

}
