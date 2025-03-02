import { Component, inject } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { Autor, ColumnKeys } from '@features/contacts/autor.interfaces';
import { AutorService } from '../autor.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      @if(data) {
        <app-grid [displayedColumns]="displayedColumns" [data]="data" [sortableColumns]="sortables" />
      }
    </section>
  `,
  styles: ``
})

export class ListComponent {
  data!: Autor[];
  displayedColumns:ColumnKeys<Autor> = ['id', 'nombre', 'descripcion', 'created', 'updated', 'action'];
  sortables:ColumnKeys<Autor> = ['id', 'nombre', 'descripcion', 'created', 'updated'];

  private readonly _autorSvc = inject(AutorService)

  getAllAutors() {
    this._autorSvc.getAllAutors()
    .pipe(
      tap((autors: Autor[]) => this.data = [...autors])
    )
    .subscribe()
  }
}
