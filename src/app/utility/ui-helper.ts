import { LoadingController, AlertController } from '@ionic/angular';

export abstract class UIHelper {
    alertCtrl: AlertController;
    loadingCtrl: LoadingController;

    constructor(alertCtrl: AlertController, loadingCtrl: LoadingController) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }

    public async displayErrorMsgAlert(page, error, defautMsg) {
        const alert = await this.alertCtrl.create({
            message: error || defautMsg,
            buttons: ['OK'], header: page, subHeader: 'Alert', mode: 'ios'
        });
        await alert.present();
    }

    public async displaySpinner() {
        return await this.loadingCtrl.create({ spinner: 'circles', mode: 'ios' });
    }

}
