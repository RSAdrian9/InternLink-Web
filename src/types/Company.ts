export interface Company {
  id: number
  name: string
  nif: string
  address: string
  phone?: string
  email?: string
  website?: string
}

// DTO para crear una nueva empresa
export interface CreateCompanyDTO {
  name: string;
  nif: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
}

// DTO para actualizar una empresa existente (todos los campos son opcionales para la actualización)
export interface UpdateCompanyDTO {
  name?: string;
  nif?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}
