import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import PatientStore from "./stores/patient.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer
} from "awilix";

import PatientService from "../services/patientService";
import PatientRepository from "../repositories/patientRepository";
import Patient, { Gender } from "../models/patient";

const mongod = new MongoMemoryServer();

let connection: MongoClient;
let db: Db;
let container: AwilixContainer;

beforeAll(async () => {
  const url = await mongod.getConnectionString();
  const dbName = await mongod.getDbName();
  connection = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db = await connection.db(dbName);
  container = createContainer();
  container.register({
    patientService: asClass(PatientService).scoped(),
    patientRepository: asClass(PatientRepository).scoped(),
    patientStore: asClass(PatientStore).scoped(),
    dbClient: asValue(db)
  });

  const store: PatientStore = container.resolve("patientStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get all patients", async () => {
    const service: PatientService = container.resolve("patientService");
    const store: PatientStore = container.resolve("patientStore");
    const result = await service.getAll();
    expect(result).toBeTruthy();
    expect(result.length).toBe(store.patients.length);
  });

  it("get one patient by its id", async () => {
    const service: PatientService = container.resolve("patientService");
    const result = await service.getAll();
    const target: Patient = result[0];

    const foundItem: Patient = await service.getById(target._id.toString());
    expect(foundItem).toBeTruthy();
    expect(foundItem._id).toEqual(target._id);
  });
});

describe("insert", () => {
  it("insert a new patient", async () => {
    const service: PatientService = container.resolve("patientService");
    const sarah = new Patient({
      age: 26,
      gender: Gender.female,
      travel: true,
      symptoms: [""],
      conditions: [""]
    });
    const newlyCreatedPatient: Patient = await service.insert(sarah);
    expect(newlyCreatedPatient).toBeTruthy();
    expect(newlyCreatedPatient._id).toBeDefined();
  });
});

describe("update", () => {
  it("update an existing patient", async () => {
    const service: PatientService = container.resolve("patientService");
    const target: Patient = (await service.getAll())[0];

    target.age = 100;
    await service.update(target._id.toString(), target);

    const updatedEntry = await service.getById(target._id.toString());
    expect(updatedEntry).toBeTruthy();
    expect(updatedEntry.age).toEqual(target.age);
  });
});

describe("delete", () => {
  it("remove an existing patient", async () => {
    const service: PatientService = container.resolve("patientService");
    const target: Patient = (await service.getAll())[0];

    await service.delete(target._id.toString());

    const foundItem: Patient = await service.getById(target._id.toString());
    expect(foundItem).toBeNull();
  });
});
