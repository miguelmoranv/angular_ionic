import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  photos: string[] = [];

  constructor(
    private storage: AngularFireStorage,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadPhotos();
  }

  async loadPhotos() {
    const storageRef = this.storage.ref('photos');
    storageRef.listAll().subscribe(result => {
      result.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          this.photos.push(url);
        });
      });
    });
  }

  async openPhotoModal() {
    const modal = await this.modalController.create({
      component: PhotoModalComponent,
      componentProps: {
        photos: this.photos
      }
    });
    return await modal.present();
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if (image && image.dataUrl!) {
      const blob = this.dataUrlToBlob(image.dataUrl!);
      const filePath = `photos/${new Date().getTime()}_${image.format}`;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.put(blob);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.photos.push(url);
            });
          })
        )
        .subscribe();
    }
  }

  dataUrlToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
