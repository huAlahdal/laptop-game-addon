import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GarageComponent } from './laptop/apps/garage/garage.component';
import { SettingsComponent } from './laptop/apps/settings/settings.component';
import { LaptopComponent } from './laptop/laptop.component';

const routes: Routes = [
  {path: 'ui', component: AppComponent, children: [
    {
      path: 'laptop', // child route path
      component: LaptopComponent, // child route component that the router renders
      children: [
        {path: 'settings', component: SettingsComponent},
        {path: 'garage', component: GarageComponent},
      ]
    },

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
