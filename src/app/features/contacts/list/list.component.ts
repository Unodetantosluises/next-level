import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { Autor, ColumnKeys } from '@features/contacts/autor.interfaces';
import { AutorService } from '../autor.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
        <app-grid [displayedColumns]="displayedColumns" [data]="autors()" [sortableColumns]="sortables" />
    </section>
  `,
  styles: ``
})

export class ListComponent implements OnInit {
  autors = signal<Autor[]>([]);

  displayedColumns:ColumnKeys<Autor> = ['id', 'nombre', 'descripcion', 'action'];
  sortables:ColumnKeys<Autor> = ['id', 'nombre', 'descripcion'];

  private readonly _autorSvc = inject(AutorService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllAutors();
  }

  getAllAutors() {
    this._autorSvc.getAllAutors()
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      tap((autors: Autor[]) => this.autors.set(autors))
    )
    .subscribe()
  }
}
