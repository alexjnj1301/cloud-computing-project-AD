import { Routes } from '@angular/router'
import { LoginComponent } from './component/login/login.component'
import { HomeComponent } from './component/home/home.component'
import { AuthGuard } from './service/auth.guard'
import { RegisterComponent } from './component/register/register.component'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]
