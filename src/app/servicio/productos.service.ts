import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = 'http://localhost:5000/api/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  addProduct(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, product);
  }

  editProduct(product: Producto): Observable<Producto> {
    const editUrl = `${this.url}`; // Asegura que el ID esté en la URL
    return this.http.patch<Producto>(editUrl, product);
  }

  deleteProduct(id: string): Observable<Producto> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<Producto>(deleteUrl);
  }
}
