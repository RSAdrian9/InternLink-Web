export interface School {
  id: number
  name: string
  city: string
  address: string
  zipcode: string
  phone?: string
  email?: string
  website?: string
}

// DTO para crear un nuevo instituto
export interface CreateSchoolDTO {
  name: string;
  city: string;
  address: string;
  zipcode: string;
  phone?: string;
  email?: string;
  website?: string;
}

// DTO para actualizar un instituto existente (todos los campos son opcionales para la actualización)
export interface UpdateSchoolDTO {
  name?: string;
  city?: string;
  address?: string;
  zipcode?: string;
  phone?: string;
  email?: string;
  website?: string;
}
