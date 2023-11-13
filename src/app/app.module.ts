import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CategoriaComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
