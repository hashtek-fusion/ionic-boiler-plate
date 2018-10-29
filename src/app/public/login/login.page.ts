import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: {
    email: string;
    password: string;
  } = { email: '', password: '' };

  constructor(private readonly authService: AuthenticationService, private readonly loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({ spinner: 'lines-small', mode: 'ios' });
    await loading.present();
    const loginResp = this.authService.login(this.user);
    loginResp.subscribe((resp: any) => {
      this.authService.setToken(resp.token, resp.user);
      loading.dismiss();
    }, (errorResp) => {
      console.log(errorResp);
      const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
      console.log(error);
      loading.dismiss();
    }
    );
  }

}
