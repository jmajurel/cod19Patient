import IPatientService from "./interfaces/patientServiceInterface";
import Patient from "../models/patient";
import IPatientRepository from "..//repositories/interfaces/patientRepoInterface";

export default class PatientService implements IPatientService {
  private readonly patientRepository: IPatientRepository;
  constructor({
    patientRepository
  }: {
    patientRepository: IPatientRepository;
  }) {
    this.patientRepository = patientRepository;
  }
  getAll(): Promise<Patient[]> {
    throw new Error("Method not implemented.");
  }
}
