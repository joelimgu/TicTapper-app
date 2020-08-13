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

  getLastEditedJob(){
    console.log("serahcing for last edited job");

    let result = new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.apiURl + '/api/getLastEditedJob').subscribe((msg: any) =>{
          console.log(msg.lastJob[0]);
          resolve(msg.lastJob[0])
      })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
    return result;
  }

  getNFCInfo(){
    let result = new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.apiURl + '/api/machine').subscribe((msg: any) =>{
          resolve(msg.arduinoConnected)
      })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
    return result;
  }

  getDBInfo(){
    let result = new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.apiURl + '/api/machine').subscribe((msg: any) =>{
          resolve(msg.databaseConnected)
      })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
    return result;
  }
}
