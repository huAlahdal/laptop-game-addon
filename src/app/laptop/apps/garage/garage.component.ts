import { Component, OnInit } from '@angular/core';
import { AppsControlService } from 'src/app/services/AppsControl.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  constructor(private AppControl: AppsControlService) { }

  ngOnInit() {
  }

  closeApp() {
    this.AppControl.CloseApp("garage")
    this.AppControl.AddNotification("Garage", "Car with plate [ES21A] is now in garage [Garage B]", "fas fa-car", "white", "#177828")
  }

}
