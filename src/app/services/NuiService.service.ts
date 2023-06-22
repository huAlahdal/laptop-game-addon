import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

export enum NativeMessageType {
  TOGGLE_PHONE = 'sentry://ui/phone/toggleDisplay'
}

@Injectable({
  providedIn: 'root'
})
export class NuiServiceService {
  showPhone = false;
  lastRoute = "/ui/laptop"
  constructor(private httpClient: HttpClient, private router: Router) {
    window.addEventListener('message', this.handleNativeEvent.bind(this));
    window.addEventListener('keyup', this.KeyupEvent.bind(this));
  }

  async KeyupEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // if (this.router.url == "/ui/laptop") {
        this.showPhone = false;
        let data = this.httpClient.post('https://ox-angular/onPhoneToggled', JSON.stringify({
            showPhone: this.showPhone
        }));
        await lastValueFrom(data);
        this.lastRoute = this.router.url;
        await this.router.navigate(['/ui']);
      // } else {
      //   this.lastRoute = this.router.url;
      //   let data = this.httpClient.post('https://ox-angular/onPhoneToggled', JSON.stringify({
      //       showPhone: this.showPhone
      //   }));
      //   await lastValueFrom(data);
      //   await this.router.navigate(['/ui']);
      // }

    }
  }

  async handleNativeEvent(event: MessageEvent<any>) {
    switch (event?.data?.message) {
        case NativeMessageType.TOGGLE_PHONE:
            this.showPhone = !this.showPhone;
            let data = this.httpClient.post('https://ox-angular/onPhoneToggled', JSON.stringify({
                showPhone: this.showPhone
            }));
            await lastValueFrom(data);

            if (this.showPhone) {
              await this.router.navigate([this.lastRoute]);
            }
            else {
                await this.router.navigate(['/ui']);
            }
        break;
        // default:
        //     throw new Error(`Event is invalid or event handler is missing for event message: ${event.data.message}`);
    }
  }




}
