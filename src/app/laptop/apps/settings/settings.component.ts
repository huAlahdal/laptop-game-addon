import { Component, OnInit } from '@angular/core';
import { AppsControlService } from 'src/app/services/AppsControl.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private AppControl: AppsControlService) { }

  ngOnInit() {
  }

  closeApp() {
    this.AppControl.CloseApp("settings")
    this.AppControl.AddNotification("Settings", "app Closed", "fas fa-archway", "white", "#172828")
  }

}
