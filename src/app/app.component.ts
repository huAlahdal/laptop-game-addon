import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuiServiceService } from './services/NuiService.service';

export enum NativeMessageType {
  TOGGLE_PHONE = 'sentry://ui/phone/toggleDisplay'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(private NuiServices: NuiServiceService) {}

}
