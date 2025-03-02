import { Component, input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'

const MATERIAL_MODULES = [MatTableModule]

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> implements OnInit{

  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();

  dataSource = new MatTableDataSource<T>();

  ngOnInit(): void {
      this.dataSource.data = this.data();
  }
}
