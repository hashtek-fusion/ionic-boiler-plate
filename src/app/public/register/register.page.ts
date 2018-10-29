import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } = { firstName: '', lastName: '', email: '', password: '' };


  constructor(private readonly authService: AuthenticationService, private readonly loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async register() {
    const loading = await this.loadingCtrl.create({ spinner: 'lines-small', mode: 'ios' });
    await loading.present();
    const regResp = this.authService.register(this.user);
    regResp.subscribe((resp: any) => {
      // Post registration login the user automatically
      const loginResp = this.authService.login({email: this.user.email, password: this.user.password});
      loginResp.subscribe((loginResponse: any) => {
        this.authService.setToken(loginResponse.token, loginResponse.user);
        loading.dismiss();
      }, (errorResp) => { // Handling user login failure
        console.log(errorResp);
        const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
        console.log(error);
        loading.dismiss();
      }
      );
    }, (errorResp) => {// Handling User registration failure
      console.log(errorResp);
      const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
      console.log(error);
      loading.dismiss();
    }
    );
  }

}
