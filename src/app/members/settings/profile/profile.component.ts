import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { UIHelper } from '../../../utility/ui-helper';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserProfileDto } from './user.profile.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends UIHelper implements OnInit {

  user: UserProfileDto = {

  };

  constructor(alertCtrl: AlertController, loadingCtrl: LoadingController,
    private readonly profileSvc: ProfileService, private readonly router: Router,
    private readonly authService: AuthenticationService) {
      super(alertCtrl, loadingCtrl);
     }

  ngOnInit() {
    this.user.firstName = this.authService.userProfileState.value.firstName;
    this.user.lastName = this.authService.userProfileState.value.lastName;
  }

  async updateProfile() {
    const loading = await this.displaySpinner();
    await loading.present();
    this.profileSvc.updateProfile(this.user)
        .subscribe((resp: any) => {
          loading.dismiss();
          this.authService.userProfileState.next(this.user); // User Profile State updated with changes
          this.displaySuccessMsgAlert('Manage Profile');
          this.router.navigateByUrl('/members');
        }, (errorResp: any) => {
          const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
          loading.dismiss();
          this.displayErrorMsgAlert('Manage Profile', error, 'Profile update Failed');
        });
  }

}
