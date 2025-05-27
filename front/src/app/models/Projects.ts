export interface Projects {
  id: number
  name: string
  userId: number
  files: [{
    id: number
    name: string
    type: string
    path: string
  }]
}
