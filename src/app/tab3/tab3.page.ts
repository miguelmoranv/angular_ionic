import { Component } from '@angular/core';
import { AuthService } from '../servicio/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      await this.showAlert('Success', 'Login successful!');
      this.router.navigate(['/home']);
    } catch (error) {
      await this.showAlert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      await this.showAlert('Success', 'Login successful!');
      this.router.navigate(['/home']);
    } catch (error) {
      await this.showAlert('Error', 'Google login failed. Please try again.');
      console.error('Google login error:', error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
