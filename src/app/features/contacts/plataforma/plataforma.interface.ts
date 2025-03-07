export type ColumnKeys<P> = Array<keyof P>;

export interface Plataforma {
  id: string;
  nombre: string;
  descripcion: string;
}
