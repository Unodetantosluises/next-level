import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatIconModule,MatToolbarModule, MatButtonModule];

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MATERIAL_MODULES],
  template: `
    <mat-toolbar color="primary">

      <a mat-button routerLink="/">
        <mat-icon>home</mat-icon>
          <span>Home</span>
      </a>

      <a mat-button routerLink="/contacts">
        <mat-icon>list_alt</mat-icon>
          <span>Autores</span>
      </a>

      <a mat-button routerLink="/noticias">
        <mat-icon>picture_in_picture</mat-icon>
          <span>Noticias</span>
      </a>

      <span class="spacer"></span>

      <a mat-button (click)="emitClick()">
        <mat-icon>add_box</mat-icon>
          <span>New</span>
      </a>

    </mat-toolbar>
  `,
  styles: ``
})

export class ToolbarComponent {
  onNewContactEvent = output<void>();

  emitClick() {
    this.onNewContactEvent.emit();
  }

}
