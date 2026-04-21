export interface PetModel {
  id: number;
  name: string;
  species: string;
  age: number;
  size: string;
  description?: string;
  status: string;
  created_by: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}
