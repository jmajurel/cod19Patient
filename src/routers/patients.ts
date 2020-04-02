import { route, GET, POST, before, DELETE, PUT } from "awilix-express";
import IPatientService from "../services/interfaces/patientServiceInterface";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import Patient from "../models/patient";

@route("/patients")
export default class PatientAPI {
  private readonly _patientService: IPatientService;
  constructor({ patientService }: { patientService: IPatientService }) {
    this._patientService = patientService;
  }
  @GET()
  async getAll(req: Request, res: Response) {
    res.status(200).json(await this._patientService.getAll());
  }
}
