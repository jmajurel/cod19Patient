import IPatientRepository from "./interfaces/patientRepoInterface";
import { Db, ObjectId, InsertOneWriteOpResult } from "mongodb";
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

  async getById(id: string): Promise<Patient> {
    return await this.dbClient
      .collection("patients")
      .findOne({ _id: new ObjectId(id) });
  }

  async insert(newPatient: Patient): Promise<Patient> {
    return await this.dbClient
      .collection("patients")
      .insertOne(newPatient)
      .then(
        (result: InsertOneWriteOpResult<Patient>): Patient => result.ops[0]
      );
  }

  async update(id: string, updatedPatient: Patient): Promise<void> {
    return await this.dbClient
      .collection("patients")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...updatedPatient } })
      .then();
  }

  async delete(id: string): Promise<void> {
    return await this.dbClient
      .collection("patients")
      .deleteOne({ _id: new ObjectId(id) })
      .then();
  }
}
