export type InternshipStatus = 'Pending' | 'Approved' | 'Finished' | 'Rejected'
export type InternshipEvaluation = 'Passed' | 'Failed' | 'Not Evaluated'

export interface InternshipAssignment {
  id: number
  student_id: number
  company_id: number
  tutor_id: number
  start_date: string
  end_date: string
  status: InternshipStatus
  evaluation: InternshipEvaluation
}

/**
 * DTO (Data Transfer Object) para CREAR una nueva asignación de prácticas.
 *
 * Omitimos 'id', 'status' y 'evaluation' porque estos campos
 * son generados o inicializados por el backend en el momento de la creación.
 */
export type CreateInternshipAssignmentDTO = Omit<InternshipAssignment, 'id'>;

/**
 * DTO (Data Transfer Object) para ACTUALIZAR una asignación de prácticas existente.
 *
 * Usamos 'Partial' para hacer que todos los campos sean opcionales,
 * ya que solo enviarás los campos que deseas modificar.
 * Omitimos 'id' porque el ID se pasa normalmente en la URL de la petición.
 */
export type UpdateInternshipAssignmentDTO = Partial<Omit<InternshipAssignment, 'id'>>;
