import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../../service/httpCallService'
import { Projects } from '../../models/Projects'
import { ActivatedRoute } from '@angular/router'
import { MatCard } from '@angular/material/card'
import { FileUploaderComponent } from '../file-uploader/file-uploader.component'

@Component({
  selector: 'app-projects',
  imports: [
    MatCard,
    FileUploaderComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  public project: Projects | undefined
  public projectId: string = ''

  public constructor(private httpCallService: HttpCallService,
                     private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')!
    this.getProject()
  }

  public getProject() {
    this.httpCallService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.project = response
      },
      error: (error) => {
        console.error('Error fetching projects:', error)
      }
    })
  }

  public getFiles() {
  }
}
