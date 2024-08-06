import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent {
  @Input() photos!: string[];

  constructor(
    private modalController: ModalController,
    private storage: AngularFireStorage
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  deletePhoto(photoUrl: string) {
    const fileRef = this.storage.storage.refFromURL(photoUrl);
    fileRef.delete().then(() => {
      this.photos = this.photos.filter(photo => photo !== photoUrl);
    });
  }
}
