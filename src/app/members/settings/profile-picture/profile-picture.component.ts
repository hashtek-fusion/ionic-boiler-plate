import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { ProfileService } from '../services/profile.service';
import { UIHelper } from '../../../utility/ui-helper';
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AuthenticationService } from '../../../services/auth/authentication.service';


@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent extends UIHelper implements OnInit {
  picture: any;
  fileUrl: any;
  isUpload = false;
  error: any;

  constructor(private camera: Camera, private imgFile: File,
    private readonly profileService: ProfileService,
    loadingCtrl: LoadingController, alertCtrl: AlertController, private webview: WebView,
    private actionSheetCtrl: ActionSheetController, private authService: AuthenticationService) {
    super(alertCtrl, loadingCtrl);
  }

  ngOnInit() {
    this.picture = this.authService.profilePictureState.value.img || '/assets/img/misc/consulting.jpg';
  }

  async displayActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      mode: 'ios',
      buttons: [
        {
          text: 'Load from Photo Library',
          handler: () => {this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY); }
        },
        {
          text: 'Take Photo',
          handler: () => {this.takePicture(this.camera.PictureSourceType.CAMERA); }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ],
    });
    await actionSheet.present();
  }

  choosePicture() {
    this.displayActionSheet();
  }

  async takePicture(sourceType: PictureSourceType) {
    console.log('take picture method triggered');
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      targetHeight: 100,
      targetWidth: 100,
    };
    const imgResponse = await this.camera.getPicture(cameraOptions);
    try {
      const resolvedWebViewUrl = this.webview.convertFileSrc(imgResponse); // TO:DO Webview not working
      this.picture = resolvedWebViewUrl;
    } catch (err) {
      this.picture = imgResponse;
      this.error = err;
    }
    this.fileUrl = imgResponse;
    this.isUpload = true;
  }

  async uploadPicture() {
    this.imgFile.resolveLocalFilesystemUrl(this.fileUrl)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file));
      })
      .catch(err => {
        console.log('error reading file');
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], { type: 'image/jpg' }); // TO:DO Need to fix file type
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
    };
  }

  async uploadImageData(data) {
    const loading = await this.displaySpinner();
    await loading.present();
    this.profileService.uploadPicture(data)
      .subscribe((resp: any) => {
        this.authService.getDisplayPicture(); // Need to invoke to reflect the DP
        this.isUpload = false;
        this.camera.cleanup();
        loading.dismiss();
      }, (errorResp) => {
        this.isUpload = false;
        const error = errorResp.error ? errorResp.error.message || errorResp.message : errorResp.statusText || 'An error ocurred';
        console.log(error);
        loading.dismiss();
        this.displayErrorMsgAlert('Picture Upload', error, 'Upload Failed');
      });
  }

}
