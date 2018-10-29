import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  userNotifications: any = [];

  constructor(private readonly notificationSvc: NotificationService, private readonly loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getUserNotifications();
  }

  async getUserNotifications() {
    this.userNotifications = [];
    const loading = await this.loadingCtrl.create({ spinner: 'lines-small', mode: 'ios' });
    await loading.present();
    this.notificationSvc.getUserNotifications()
      .subscribe((resp: any) => {
        this.userNotifications = resp;
        loading.dismiss();
      }, (errorResp) => {
      console.log(errorResp);
      const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
      console.log(error);
      loading.dismiss();
    });
  }

}
