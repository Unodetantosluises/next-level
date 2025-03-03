import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AutorService } from '@features/contacts/autor.service';
import { ModalService } from './modal.service';
import { APP_CONTANTS } from '@shared/constants';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '@shared/services/snack-bar-service';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule]

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule],
  templateUrl: `./modal.component.html`,
  styleUrl: `./modal.component.scss`
})

export class ModalComponent implements OnInit {
  autorForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _autorSvc = inject(AutorService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
    this.autorForm.patchValue(this._matDialog.data);
  }

  async onSubmit() {
    let message = APP_CONTANTS.MESSAGES.AUTOR_UPDATED;
    const autor = this.autorForm.value;

    if(this._matDialog.data) {
      this._autorSvc.updateAutor(this._matDialog.data.id, autor);
    } else {
      await this._autorSvc.newAutor(autor);
      message = APP_CONTANTS.MESSAGES.AUTOR_ADDED;
    }

    this._snackBar.showSnackBar(message);
    this._modalSvc.closeModal();
  }


  getTitle(): string {
    return this._matDialog.data ? 'Editar Autor' : 'Agregar Autor';
  }

  private _buildForm(): void {
    this.autorForm = this._fb.nonNullable.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }
}
