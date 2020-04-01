import IPatientRepository from "./interfaces/patientRepoInterface";
import { Db } from "mongodb";
import Patient from "../models/patient";

export default class PatientRepository implements IPatientRepository {
  private readonly dbClient: Db;

  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }

  async getAll(): Promise<Patient[]> {
    return (
      await this.dbClient.collection("patients").find({})
    ).toArray() as Promise<Patient[]>;
  }
}
