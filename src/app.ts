import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { asClass, createContainer, asValue } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-express";
import PatientService from "./services/patientService";
import PatientRepository from "./repositories/patientRepository";

dotenv.config();
const app = express();
app.use(cors());
let connectionString = process.env.DB_CONNECTION_STRING;

connectionString = connectionString
  .replace("<dbuser>", process.env.DB_USER)
  .replace("<dbpassword>", process.env.DB_PWD);

async function configureContainer() {
  const container = createContainer();

  const dbConnection = (await MongoClient.connect(connectionString)).db(
    process.env.DB_NAME
  );
  container.register({
    patientService: asClass(PatientService).scoped(),
    patientRepository: asClass(PatientRepository).scoped(),
    dbClient: asValue(dbConnection)
  });

  return container;
}

configureContainer().then(container => {
  app.use(scopePerRequest(container));

  app.use(loadControllers("routers/*.ts", { cwd: __dirname }));
  const PORT = process.env.PORT || 8082;

  app.listen(PORT, () => {
    console.log("cod19Patient is listenning on port: ", PORT);
  });
});
