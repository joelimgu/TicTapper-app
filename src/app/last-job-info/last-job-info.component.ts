import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-last-job-info',
  templateUrl: './last-job-info.component.html',
  styleUrls: ['./last-job-info.component.scss']
})
export class LastJobInfoComponent implements OnInit {

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._updateStatus()
  }

  tittle = "Ùltima feina feta:"

  name = "NA"
  ref = "NA"
  url = "NA"
  qty = "NA"
  qtyDone = "NA"
  rom = "NA"
  status = "NA"
  modified_at = "NA"

//updates the pannel on the left of the screen, it shows the current job or the last one if it's not wirking
  async _updateStatus(){
    while (true) {
      var job = {}
      await this._delay(5000);

      try {
        job = await this._http.getcurrentJob();
        this.tittle = "Treballant en:"
        if (job.status == "stop" || !job) {
          this.tittle = "Ùltima feina feta:"
          job = await this._http.getLastEditedJob();
        }
      } catch (error) {
        console.log("can't connect to http server, error : " + error);
      }
      this.displayJob(job)
    }
  }

//dysplays a job in the panel
  displayJob(job){
    this.name = job.name
    this.ref = job.ref
    this.url = job.pre_url
    this.qty = job.qty
    this.qtyDone = job.qtydone
    this.rom = job.rom
    this.status = job.status
    this.modified_at = job.modified_at
  }

//delay function
  _delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
