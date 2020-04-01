import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import SymptomStore from "./stores/symptom.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer
} from "awilix";

import PatientService from "../services/patientService";
import PatientRepository from "../repositories/patientRepository";
import Patient from "../models/patient";

const mongod = new MongoMemoryServer();

let connection: MongoClient = null;
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
    patientStore: asClass(SymptomStore).scoped(),
    dbClient: asValue(db)
  });

  const store: SymptomStore = container.resolve("patientStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get all symptoms", async () => {
    const service: SymptomService = container.resolve("symptomService");
    const store: SymptomStore = container.resolve("symptomStore");
    const result = await service.getAll();
    expect(result).toBeTruthy();
    expect(result.length).toBe(store.symptoms.length);
  });

  it("get one symptom by its id", async () => {
    const service: SymptomService = container.resolve("symptomService");
    const result = await service.getAll();
    const target = result[0];

    const foundItem = await service.getById(target._id.toString());
    expect(foundItem).toBeTruthy();
    expect(foundItem.name).toMatch(target.name);
  });
});
