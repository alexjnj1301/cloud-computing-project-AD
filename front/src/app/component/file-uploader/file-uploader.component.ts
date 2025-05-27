import { Component, ElementRef, ViewChild } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCommentDots, faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import { MatRipple } from '@angular/material/core'
import { MatIcon } from '@angular/material/icon'
import { MatFabButton, MatIconButton } from '@angular/material/button'
import { HttpCallService } from '../../service/httpCallService'
import { MatProgressBar } from '@angular/material/progress-bar'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-file-uploader',
  imports: [
    MatRipple,
    MatIcon,
    MatIconButton,
    MatFabButton,
    MatProgressBar,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {
  @ViewChild('fileInput') fileInput!: ElementRef
  public files: File[] = []
  public sending: boolean = false
  public filesToSend: number = 0
  public filesSent: number = 0
  public fileInError: File[] = []
  public projectId: string = ''

  public constructor(public httpCallService: HttpCallService,
                     private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id')!
  }

  public triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click()
    }
  }

  public onChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const existingFile = this.files.find(file => file.name === input.files![0].name)
      if (existingFile) {
        console.warn('File already exists:', existingFile.name)
        return
      }
      this.files?.push(input.files[0])
    }

    this.filesToSend = this.files.length
  }

  public removeFile(file: File) {
    if (this.files) {
      const index = this.files.indexOf(file)
      if (index > -1) {
        this.files.splice(index, 1)
      }
    }
  }

  public sendFile(files: File[]) {
    this.sending = true
    let nbErrors: number = 0
    this.filesToSend = files.length
    this.filesSent = 0

    for (const file of files) {
      this.httpCallService.sendFile(file, this.projectId).subscribe({
        next: () => {
          this.files = this.files.filter(f => f !== file)
          this.filesSent++
          if (this.filesSent === this.filesToSend) {
            this.sending = false
            window.location.reload()
          }
        },
        error: (error: any) => {
          console.error('Error sending files:', error)
          nbErrors++
          this.fileInError.push(file)
        }
      })
    }
  }
}
