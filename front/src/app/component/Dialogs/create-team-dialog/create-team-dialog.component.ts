import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { HttpCallService } from '../../../service/httpCallService'

@Component({
  selector: 'app-create-team-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel
  ],
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.scss'
})
export class CreateTeamDialogComponent {
  public dialogRef = inject(MatDialogRef<CreateTeamDialogComponent>)
  public teamName: string = ''

  public constructor(private httpCallService: HttpCallService) {
  }

  public createTeam() {
    this.httpCallService.createTeam(this.teamName).subscribe({
      next: () => {
        console.log('Team created successfully')
        this.dialogRef.close()
      },
      error: (error) => {
        console.error('Error creating team:', error)
      }
    })
  }
}
