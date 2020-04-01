import Patient from "../../models/patient";

export default interface IPatientRepository {
  getAll(): Promise<Patient[]>;
}
