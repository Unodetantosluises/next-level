import { Timestamp } from "@angular/fire/firestore";
import { Autor } from "../autor.interfaces";
import { Plataforma } from "../plataforma/plataforma.interface";
import { Etiqueta } from "../etiqueta/etiqueta.interface";
import { Categoria } from "../categoria/categoria.interface";

export type ColumnKeys<N> = Array<keyof N>;

export interface Noticia {
  id: string;
  titulo: string;
  autor:Autor;
  created: Timestamp;
  fechaPublicacion: Timestamp;
  imagenNoticia: string;
  plataforma: Plataforma;
  etiqueta: Etiqueta;
  categoria: Categoria;
}
