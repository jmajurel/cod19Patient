import Patient from "../../models/patient";
import { Db } from "mongodb";

const patient0 = new Patient({
  age: 30,
  gender: 2,
  travel: true,
  symptoms: ["120"],
  conditions: ["12"]
});
class PatientStore {
  public patients: Patient[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.patients = [];
    this.dbClient = dbClient;
    this.addPatient(patient0);
  }

  addPatient(newPatient: Patient): PatientStore {
    this.patients.push(newPatient);
    return this;
  }

  async mount() {
    const promises = [];
    for (let i = 0; i < this.patients.length; i++) {
      promises.push(
        this.dbClient
          .collection("patients")
          .insertOne(new Patient(this.patients[i]))
      );
    }
    await Promise.all(promises);
    return;
  }
}

export default PatientStore;
