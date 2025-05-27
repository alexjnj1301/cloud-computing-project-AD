import { Component, OnInit } from '@angular/core';
import { Teams } from '../../models/Teams'
import { MatFabButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion'
import { MatCard } from '@angular/material/card'
import { HttpCallService } from '../../service/httpCallService'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-teams',
  imports: [
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanelDescription,
    MatCard,
    MatFabButton,
    RouterLink,
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {
  public teams: Teams[] = []

  public constructor(private httpCallService: HttpCallService) {
  }

  public ngOnInit() {
    this.getTeams()
  }

  public getTeams() {
    this.httpCallService.getTeams().subscribe({
      next: (teams) => {
        this.teams = teams;
        //for each team, get the projects of the team
        for (let team of this.teams) {
          this.httpCallService.getProjectsByTeam(team.id).subscribe({
            next: (projects) => {
              team.projects = projects;
            },
            error: (error) => {
              console.error(`Error fetching projects for team ${team.id}:`, error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
      }
    })
  }
}
