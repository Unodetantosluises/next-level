import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Autor {
  id: string;
  nombre: string;
  descripcion: string;
  action: string;
  created: Timestamp;
  updated: Timestamp;
}
