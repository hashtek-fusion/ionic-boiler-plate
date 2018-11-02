import { Component, OnInit } from '@angular/core';
import { UserPasswordDto } from './user.password.dto';
import { LoadingController, AlertController } from '@ionic/angular';
import { UIHelper } from '../../../utility/ui-helper';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends UIHelper implements OnInit {

  user: UserPasswordDto = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(alertCtrl: AlertController, loadingCtrl: LoadingController,
    private readonly profileSvc: ProfileService, private readonly router: Router) {
    super(alertCtrl, loadingCtrl);
  }

  ngOnInit() {
  }

  async changePassword() {
    const loading = await this.displaySpinner();
    await loading.present();
    this.profileSvc.changePassword(this.user)
        .subscribe((resp: any) => {
          loading.dismiss();
          this.displaySuccessMsgAlert('Change Password');
          this.router.navigateByUrl('/members');
        }, (errorResp: any) => {
          const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
          loading.dismiss();
          this.displayErrorMsgAlert('Change Password', error, 'Password update Failed');
        });
  }

}
