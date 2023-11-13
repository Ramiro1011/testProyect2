import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/service/Categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{
  categoriaList = new Array<Categoria>()
  selectedCategoria: Categoria = { id: 0, denominacion: ''};

  constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void{
    this.getAll()
  }

  getAll(){
    this.categoriaService.getAll().subscribe(Response =>{
      this.categoriaList = Response
      console.log(this.categoriaList)
    }), (error: any) => {
      console.log(error)
    }
  }

  view(id: number) {
    const categoria = this.categoriaList.find(c => c.id === id);

  if (categoria) {
    this.selectedCategoria = { ...categoria };
  }
  }
  
  save() {
    if (this.selectedCategoria.id === 0) {
      this.categoriaService.save(this.selectedCategoria).subscribe(() => {
        this.getAll();
      });
    } else {
      this.categoriaService.update(this.selectedCategoria).subscribe(() => {
        this.getAll();
      });
    }
  }
  
  delete(id: number) {
    this.categoriaService.delete(id).subscribe(Response =>{
      this.getAll()
  }), (error: any) => {
    console.log(error)
  }}

  getCategoria(id: number) {
    this.categoriaService.getCategoria(id).subscribe((categoria) => {
      if (categoria) {
        this.selectedCategoria = { ...categoria };
      }
    });
    return this.selectedCategoria;
  }
}
