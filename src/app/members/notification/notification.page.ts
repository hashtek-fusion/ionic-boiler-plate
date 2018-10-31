import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { UIHelper } from '../../utility/ui-helper';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage extends UIHelper implements OnInit {

  userNotifications: any = [];

  constructor(private readonly notificationSvc: NotificationService, loadingCtrl: LoadingController, alertCtrl: AlertController) {
    super(alertCtrl, loadingCtrl);
   }

  ngOnInit() {
    this.getUserNotifications();
  }

  async getUserNotifications() {
    this.userNotifications = [];
    const loading = await this.displaySpinner();
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
      this.displayErrorMsgAlert('User Notifications Page', error, 'Not able to retrieve Notifications');
    });
  }

}
