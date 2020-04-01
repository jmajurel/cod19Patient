import Patient from "../../models/patient";

export default interface IPatientService {
  getAll(): Promise<Patient[]>;
}
