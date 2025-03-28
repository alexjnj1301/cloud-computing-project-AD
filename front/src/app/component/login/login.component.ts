import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { Router, RouterLink } from '@angular/router'
import { MatButton } from '@angular/material/button'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card'
import { HttpCallService } from '../../service/httpCallService'
import { SnackBarService } from '../../service/SnackBar-service'

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    RouterLink,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public isLoading: boolean = false
  public loginForm: FormGroup

  public constructor(private fb: FormBuilder,
                     private httpCallService: HttpCallService,
                     private router: Router,
                     private snackBarService: SnackBarService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public login() {
    this.isLoading = true
    this.httpCallService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.httpCallService.setCurrentUser(response)
        this.router.navigate(['/home'])
        this.snackBarService.openInfoSnackBar('Connexion réussie')
        this.isLoading = false
      },
      error: (error: any) => {
        console.error(error)
        this.snackBarService.openErrorSnackBar('Une erreur est survenue lors de la tentative de connexion')
        this.isLoading = false
      }
    })
  }
}
