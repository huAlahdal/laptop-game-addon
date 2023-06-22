import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { appData } from '../models/appdata';
import { AppsControlService } from '../services/AppsControl.service';
import { NuiServiceService } from '../services/NuiService.service';

let apps_data: appData[] = [
  { name: "settings", label: "Settings", icon: "fas fa-archway", background: "#172828", color: "white", route: "settings", current: false},
  { name: "garage", label: "Garage", icon: "fas fa-car", background: "#177828", color: "white", route: "garage", current: false},
];

let testNotification = [
  {id: 0, title: "Garage", text: "You have marked your car on map"}
]

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  apps = apps_data
  openedApps : appData[] = [];
  notifications : {id:number, title:string, text:string, icon:string, color?:string, background?:string, timeout?:number, hide?:boolean}[] = []

  constructor(private nuiService: NuiServiceService, private appcontrol: AppsControlService, private router: Router) { }

  ngOnInit() {
    this.appcontrol.opened_Apps.subscribe((result) => {this.openedApps = result;})
    this.appcontrol.notifications.subscribe((result) => {
      this.notifications.forEach(x => {
        const found = result.find(y => y.id === x.id)
        if (!found) {
          x.hide = true;
        }
      })
      setTimeout(() => {
        this.notifications = result;
      }, 1000);

    })
  }

  Getcurrentapp() {
    let app = this.openedApps.find(x => x.current === true)
    return app?.name ?? false
  }

  CloseApp() {
    let app = this.openedApps.find(x => x.current === true)
    this.appcontrol.CloseApp(app?.name ?? "")
  }

  GoToApp(index: string) {
    let foundData = apps_data.findIndex(x => x.name === index)
    this.appcontrol.OpenApp(apps_data[foundData])
  }


}

