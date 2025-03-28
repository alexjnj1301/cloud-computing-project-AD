import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MatButton } from '@angular/material/button'
import { HttpCallService } from '../../service/httpCallService'
import { LoginResponse } from '../../models/Authent'
import { SnackBarService } from '../../service/SnackBar-service'

@Component({
  selector: 'app-register',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatFormField,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup
  public isLoading: boolean = false

  public constructor(private fb: FormBuilder,
                     private httpCallService: HttpCallService,
                     private snackBarService: SnackBarService,
                     private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public register(): void {
    this.isLoading = true
    this.httpCallService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        this.httpCallService.setCurrentUser(response)
        this.router.navigate(['/home'])
        this.snackBarService.openInfoSnackBar('Inscription et connexion réussie')
        this.isLoading = false
      },
      error: (error: any) => {
        console.error(error)
        this.snackBarService.openErrorSnackBar('Une erreur est survenue lors de la tentative d\'inscription')
        this.isLoading = false
      }
    })
  }
}
