export type UserRole = 'Student' | 'Tutor'

export type Degree = '1ºSMR' | '2ºSMR' | '1ºDAM' | '2ºDAM' | '2ºDAW';

export interface User {
  id: number
  name: string
  phone: string
  dni: string
  email: string
  email_verified_at: string | null
  role: UserRole
  school_id?: number | null
  birthdate?: string | null
  degree?: Degree | null
  city?: string | null;
  address?: string | null
  zipcode?: string | null
}

// // DTO para crear un usuario (sin ID, con password)
// export type CreateUserDTO = Omit<User, 'id'> & { password: string };

// // DTO para actualizar un usuario (todos los campos opcionales, sin ID en el cuerpo)
// export type UpdateUserDTO = Partial<Omit<User, 'id'>>;

export interface CreateUserDTO {
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  address?: string | null;
  zipcode?: string | null;
  dni: string;
  role: UserRole;
  degree?: Degree | null; // <--- ¡CAMBIA ESTA LÍNEA A Degree | null!
  birthdate?: string | null;
  school_id?: number | null;
  password?: string;
  email_verified_at?: string | null;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string | null;
  city?: string | null;
  address?: string | null;
  zipcode?: string | null;
  dni?: string;
  role?: UserRole;
  degree?: Degree | null; // <--- ¡CAMBIA ESTA LÍNEA A Degree | null!
  birthdate?: string | null;
  school_id?: number | null;
  password?: string;
  email_verified_at?: string | null;
}