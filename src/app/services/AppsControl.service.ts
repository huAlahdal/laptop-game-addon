import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { appData } from '../models/appdata';



@Injectable({
  providedIn: 'root'
})
export class AppsControlService {
  notifyIndex = 0
  opened_Apps = new BehaviorSubject<appData[]>([]);
  notifications = new BehaviorSubject<{id:number, title:string, text:string, icon:string, color?:string, background?:string, timeout?:number}[]>([]);

  constructor(private router: Router) {
  }

  OpenApp(app:appData) {
    let data = this.opened_Apps.getValue()
    let foundIndex = data.findIndex(x => x.name === app.name)
    if (data.length > 0) {data.forEach(app => {app.current = false;})}

    if (foundIndex !== -1) {
      data[foundIndex].current = true
      this.opened_Apps.next(data);
      this.router.navigate(['ui/laptop/' + app.route]);
    } else {
      app.current = true;
      data.push(app)
      this.opened_Apps.next(data);
      this.router.navigate(['ui/laptop/' + app.route]);
    }

  }

  CloseApp(app:string) {
    let data = this.opened_Apps.getValue()
    if (data.find(x => x.name === app)) {
      let newData = data.filter(x => x.name !== app)

      if (newData.length > 0) {

        newData.forEach(app => {app.current = false;})
        newData[newData.length-1].current = true
        this.router.navigate(['ui/laptop/' + newData[newData.length-1].route]);

      } else {
        this.router.navigate(['ui/laptop']);
      }

      this.opened_Apps.next(newData);
    }
  }

  AddNotification(title:string, text:string, icon:string, color?:string, background?:string, timeout?:number) {
    let data = this.notifications.getValue()
    const id = this.notifyIndex
    this.notifyIndex += 1;
    data.push({id: id, title: title, text: text, icon: icon, color: color? color:"white", background: background? background:"#2764e700"})
    this.notifications.next(data)
    setTimeout(()=>{
      let updatedData = this.notifications.getValue()
      updatedData = updatedData.filter(x => x.id !== id)
      this.notifications.next(updatedData)
    }, timeout ? timeout : 5000);
  }

}
