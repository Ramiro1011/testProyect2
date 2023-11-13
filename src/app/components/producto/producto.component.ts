import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { Producto } from 'src/app/models/Producto';
import { CategoriaService } from 'src/app/service/Categoria.service';
import { ProductoService } from 'src/app/service/Producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productoList = new Array<Producto>();
  categoriaList = new Array<Categoria>();
  editing: boolean = false;

  categoria = new Categoria();
  producto = new Producto();
  productoForm: FormGroup;
  categoriaForm: FormGroup;
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {

  }

  ngOnInit(): void {
    this.categoriaForm = new FormGroup({
      id: new FormControl(-1),
      nuevaCategoria: new FormControl(this.categoria.denominacion, Validators.required)
    });
    this.productoForm = new FormGroup({
      id: new FormControl(-1),
      name: new FormControl(this.producto.name, Validators.required),
      Categoria: new FormControl(this.producto.categoria?.id, Validators.required),
      marca: new FormControl(this.producto.marca, Validators.required),
      precio: new FormControl(this.producto.precio, Validators.required),
      descripcion: new FormControl(this.producto.descripcion)
    });
    this.getCategoria();
    this.getAll();
  }

  getAll() {
    this.productoService.getAll().subscribe(Response => {
      this.productoList = Response;
    }), (error: any) => {
      console.log(error);
    };
  }

  getCategoria(){
    this.categoriaService.getAll().subscribe(Response =>{
      this.categoriaList = Response;
    }), (error: any) =>{
      console.log(error);
    }
  }

  view(id: number) {
    const producto = this.productoList.find(p => p.id === id);
    if (producto) {
      this.productoForm.patchValue(producto); 
      this.producto.id = id;
      this.editing = true;
    }
  }

  save() {
    const newProduct = {...this.productoForm.value};
    const selectedCategoryId = this.productoForm.get('Categoria')?.value;
    
    newProduct.categoria = {
      id: selectedCategoryId,
      denominacion: this.categoriaList.find(c => c.id === selectedCategoryId)?.denominacion
    };

    if (this.producto.id === undefined) {
      this.productoService.save(newProduct).subscribe(() => {
        this.getAll();
        this.resetForm();
      }), (error: any) =>{
        console.log(error);
      };
    } else {
      this.productoService.update(newProduct).subscribe(() => {
        this.getAll();
        this.resetForm();
      }), (error: any) =>{
        console.log(error);
      };
    }
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(() => {
      location.reload();
    }, (error: any) => {
      console.log(error);
    });
  }

  cancelarEdit() {
    this.producto = new Producto();
    this.resetForm();
    this.editing = false;
  }

  agregarCategoria(){
    const nueva = {...this.categoriaForm.value, denominacion: this.categoriaForm.value.nuevaCategoria};
    if(this.categoria.id === undefined){
      this.categoriaService.save(nueva).subscribe(()=>{
        this.getCategoria();
        this.resetForm();
      }, (error: any) =>{
        console.log(error);
      });
    }
  }

  resetForm() {
    this.productoForm.reset();
    this.productoForm.markAsUntouched();
    this.productoForm.markAsPristine();
    this.categoriaForm.reset();
    this.categoriaForm.markAsUntouched();
    this.categoriaForm.markAsPristine();
    this.producto = new Producto();
    this.categoria = new Categoria();
  }
}

function type(nueva: any): any {
  throw new Error('Function not implemented.');
}
