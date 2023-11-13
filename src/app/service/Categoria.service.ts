import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = 'http://localhost:8080/categoria'

  constructor(private http: HttpClient) { }
  getAll():Observable<any>{
    return this.http.get(this.url).pipe(
      catchError((error: any) => {
        console.error('Error al obtener categoria:', error);
        throw error;
      })
    );
    
  }
  save(c: Categoria):Observable<any>{
    console.log('Guardando categoría:', c);
    return this.http.post(this.url, c).pipe(
      tap((response: any) => {
        console.log('Respuesta del servidor:', response);
      }),
      catchError((error: any) => {
        console.error('Error al guardar categoría:', error);
        throw error;
      })
    );
  }
  delete(id: number):Observable<any>{
    return this.http.post(this.url + '/'+id+'/delete', null).pipe(
      catchError((error: any) => {
        console.error('Error al borrar categoria:', error);
        throw error;
      })
    );
    
  }
  update(c: Categoria):Observable<any>{
    return this.http.post(this.url + '/'+c.id+'/update', c).pipe(
      catchError((error: any) => {
        console.error('Error al modificar categoria:', error);
        throw error;
      })
    );
    
  }
  getCategoria(id: number):Observable<any>{
    return this.http.post(this.url+'/'+id+'/getCategoria', null).pipe(
      catchError((error: any) => {
        console.error('Error al seleccionar categoria:', error);
        throw error;
      })
    );
    
  }
}
