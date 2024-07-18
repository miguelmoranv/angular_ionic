import { Component } from '@angular/core';
import { PhotoService } from '../servicio/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  photos:any[]=[]

  constructor(public photoService: PhotoService) {
    this.photos=this.photoService.photos
  }

  takePhoto(){
    this.photoService.addPhoto();
  }

}
