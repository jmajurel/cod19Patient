import Patient from "../../models/patient";

export default interface IPatientService {
  getAll(): Promise<Patient[]>;
  getById(id: string): Promise<Patient>;
  insert(newPatient: Patient): Promise<Patient>;
  update(id: string, updatedPatient: Patient): Promise<void>;
  delete(id: string): Promise<void>;
}
