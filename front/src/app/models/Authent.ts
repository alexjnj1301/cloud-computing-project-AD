export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: User
}

export interface User {
  id: number
  email: string
  firstname: string
  lastname: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstname: string
  lastname: string
}
