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
  async getAll(): Promise<Patient[]> {
    return await this.patientRepository.getAll();
  }
  async getById(id: string): Promise<Patient> {
    return await this.patientRepository.getById(id);
  }
  async insert(newPatient: Patient): Promise<Patient> {
    return await this.patientRepository.insert(newPatient);
  }
  async update(id: string, updatedPatient: Patient): Promise<void> {
    return await this.patientRepository.update(id, updatedPatient);
  }
  async delete(id: string): Promise<void> {
    return await this.patientRepository.delete(id);
  }
}
