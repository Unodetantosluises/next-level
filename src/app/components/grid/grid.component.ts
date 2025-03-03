import { Component, effect, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { FilterComponent } from "./filter/filter.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { APP_CONTANTS } from '@shared/constants';
import { AutorService } from '@features/contacts/autor.service';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { SnackBarService } from '@shared/services/snack-bar-service';

const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginator, MatButtonModule, MatIcon];

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES, FilterComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> implements OnInit{
  displayedColumns = input.required<string[]>();

  data = input.required<T[]>();

  sortableColumns = input<string[]>([]);

  dataSource = new MatTableDataSource<T>();

  valueToFilter = signal('');

  private readonly _sort = viewChild.required<MatSort>(MatSort);

  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  private readonly _autorSvc = inject(AutorService);

  private readonly _modalSvc = inject(ModalService);

  private readonly _snackBar = inject(SnackBarService);

  constructor() {
    effect(() => {
      if(this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }
      if (this.data()) {
        this.dataSource.data = this.data();
      }
    }, {allowSignalWrites: true})
  }

  ngOnInit(): void {
      this.dataSource.data = this.data();
      this.dataSource.sort = this._sort();
      this.dataSource.paginator = this._paginator();
  }

  openEditForm(data: T): void {
    this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data, true);
  }

  selectedRow(data: T):void {
    this.openEditForm(data);
  }

  deleteContact(id: string): void {
    const confirmation = confirm(APP_CONTANTS.MESSAGES.CONFIRMATION_PROMPT);
    if(confirmation) {
      this._autorSvc.deleteAutor(id);
      this._snackBar.showSnackBar(APP_CONTANTS.MESSAGES.AUTOR_DELETED)
    }
  }
}
