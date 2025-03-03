import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Autor {
  id: string;
  nombre: string;
  descripcion: string;
  created: Timestamp;
  updated: Timestamp;
  action: string;
}
