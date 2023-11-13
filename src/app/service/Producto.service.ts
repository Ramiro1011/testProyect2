import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'http://localhost:8080/producto'

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.url).pipe(
      catchError((error: any) => {
        console.error('Error al obtener productos:', error);
        throw error;
      })
    );
  }
  save(p: Producto): Observable<any> {
    return this.http.post(this.url, p).pipe(
      catchError((error: any) => {
        console.error('Error al guardar producto:', error);
        throw error;
      })
    );
  }
   delete(id: number):Observable<any>{
    return this.http.post(this.url + '/'+id+'/delete', null).pipe(
      catchError((error: any) => {
        console.error('Error al borrar producto:', error);
        throw error;
      })
    );
   }
   update(p: Producto):Observable<any>{
    return this.http.post(this.url + '/'+p.id+'/update', p).pipe(
      catchError((error: any) => {
        console.error('Error al modificar producto:', error);
        throw error;
      })
    );
   }
}
