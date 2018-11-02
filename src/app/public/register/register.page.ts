import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { UIHelper } from '../../utility/ui-helper';
import { RegistrationDto } from './registration.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends UIHelper implements OnInit {

  user: RegistrationDto = { firstName: '', lastName: '', email: '', password: '' };

  constructor(private readonly authService: AuthenticationService,
    alertCtrl: AlertController, loadingCtrl: LoadingController) {
    super(alertCtrl, loadingCtrl);
  }

  ngOnInit() {
  }

  async register() {
    const loading = await this.displaySpinner();
    await loading.present();
    const regResp = this.authService.register(this.user);
    regResp.subscribe((resp: any) => {
      // Post registration login the user automatically
      const loginResp = this.authService.login({ email: this.user.email, password: this.user.password });
      loginResp.subscribe((loginResponse: any) => {
        this.authService.setToken(loginResponse.token, loginResponse.user);
        loading.dismiss();
      }, (errorResp) => { // Handling user login failure
        const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
        loading.dismiss();
        this.displayErrorMsgAlert('Login Page', error, 'Login Failed');
      }
      );
    }, (errorResp) => {// Handling User registration failure
      const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
      loading.dismiss();
      this.displayErrorMsgAlert('Registration Page', error, 'Registration Failed');
    }
    );
  }

}
