import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStatus } from "./interfaces/StatusInterface";
import { IJob } from "./interfaces/JobInterface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  apiURl = 'http://192.168.1.116:4300' //'http://localhost:8080';

  getStatus(){
    let result = new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.apiURl + '/api/machine').subscribe((msg: any) =>{
          resolve(msg.status)
      })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
    return result;
  }

  insertNewJob(newJob: IJob) {
    return this.http.post<any>(this.apiURl + '/api/addNewJob', {newJob: newJob}).subscribe((msg: any) =>{})
  }

  getJob(){
    /*let result = new Promise((resolve, reject) => {
      this.http.get<any>(this.apiURl + '/api/status').subscribe((msg: any) =>{
        resolve(msg.currentJob)
    })});*/
    return "result";
  }

  updateDB(newDB){
    console.log("setting db to : " + newDB);
    this.http.post<any>(this.apiURl + '/api/updateDB', {newDB: newDB}).subscribe((msg: any) =>{})
  }

  getcurrentJob(){
    let result = new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.apiURl + '/api/machine').subscribe((msg: any) =>{
          resolve(msg.currentJob)
      })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
    return result;
  }

  getSpeed(){
    let result = new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.apiURl + '/api/machine').subscribe((msg: any) =>{
          resolve(msg.finishedTime)
      })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
    return result;
  }
}
