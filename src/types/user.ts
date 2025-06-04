export type UserRole = 'Student' | 'Tutor'

export interface User {
  id: number
  name: string
  phone: string
  dni: string
  email: string
  email_verified_at: string | null
  role: UserRole
  school_id?: number | null
  birthdate?: string
  degree?: string
  city?: string
  address?: string
  zipcode?: string
}