import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { HttpCallService } from '../../../service/httpCallService'

@Component({
  selector: 'app-create-project-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    FormsModule
  ],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent {
  public dialogRef = inject(MatDialogRef<CreateProjectDialogComponent>)
  public projectName: string = ''
  public data = inject(MAT_DIALOG_DATA)

  public constructor(private httpCallService: HttpCallService) {
  }

  public createProject() {
    this.httpCallService.createProject(this.projectName, this.data.teamId).subscribe({
      next: () => {
        console.log('Project created successfully')
        this.dialogRef.close()
      },
      error: (error) => {
        console.error('Error creating project:', error)
      }
    })
  }
}
