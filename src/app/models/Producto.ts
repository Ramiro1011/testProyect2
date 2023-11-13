import { Categoria } from "./Categoria"

export class Producto{
    id :number
    name :string
    marca :string
    precio :number
    descripcion :string
    categoria? :Categoria | null
}