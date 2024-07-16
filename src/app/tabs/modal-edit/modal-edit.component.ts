import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from 'src/app/servicio/productos.service';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() item!: Producto;
  name!: string;
  description!: string;
  price!: number;
  amount!: number;

  constructor(private modalCtrl: ModalController, private productosService: ProductosService) { }

  ngOnInit(): void {
    if (this.item) {
      this.name = this.item.name;
      this.description = this.item.description;
      this.price = this.item.price;
      this.amount = this.item.amount;
    }
  }

  confirm() {
    if (this.item && this.item._id) {
      this.item.name = this.name;
      this.item.description = this.description;
      this.item.price = this.price;
      this.item.amount = this.amount;

      // Create a new object with 'id' instead of '_id'
      const itemToSend: any = {
        ...this.item,
        id: this.item._id, // Assign '_id' to 'id'
      };

      // Delete '_id' if you don't want it in the final object
      delete itemToSend._id;

      // Print the object being sent to verify its structure
      console.log('Enviando objeto:', itemToSend);

      this.productosService.editProduct(itemToSend as Producto).subscribe(response => {
        console.log('Producto actualizado:', response);
        this.modalCtrl.dismiss(this.item, 'confirm');
      }, error => {
        console.error('Error actualizando el producto:', error);
        console.log('Objeto enviado:', itemToSend);
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
