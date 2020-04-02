import Patient, { Gender } from "../../models/patient";
import { Db } from "mongodb";

const patient0 = new Patient({
  age: 30,
  gender: Gender.female,
  travel: true,
  symptoms: ["5e78a75773574d002b658048", "5e78a75873574d002b658049"],
  conditions: ["5e78a8b573574d002b658050"]
});

const diabeticPatient = new Patient({
  age: 50,
  gender: Gender.male,
  travel: false,
  symptoms: ["5e78a75773574d002b658048"],
  conditions: ["5e78a8b773574d002b658053"]
});

class PatientStore {
  public patients: Patient[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.patients = [];
    this.dbClient = dbClient;
    this.addPatient(patient0).addPatient(diabeticPatient);
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
