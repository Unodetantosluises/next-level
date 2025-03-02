import { Component, effect, input, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { FilterComponent } from "./filter/filter.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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

  constructor() {
    effect(() => {
      if(this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = ''
      }
    }, {allowSignalWrites: true})
  }

  ngOnInit(): void {
      this.dataSource.data = this.data();
      this.dataSource.sort = this._sort();
      this.dataSource.paginator = this._paginator();
  }
}
