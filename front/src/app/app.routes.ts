import { Routes } from '@angular/router'
import { LoginComponent } from './component/login/login.component'
import { HomeComponent } from './component/home/home.component'
import { AuthGuard } from './service/auth.guard'
import { RegisterComponent } from './component/register/register.component'
import { TeamsComponent } from './component/teams/teams.component'
import { ProjectsComponent } from './component/projects/projects.component'

export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectsComponent, canActivate: [AuthGuard] }
]
