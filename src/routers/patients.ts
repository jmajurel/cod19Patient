import { route, GET, POST, before, DELETE, PUT } from "awilix-express";
import IPatientService from "../services/interfaces/patientServiceInterface";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import Patient from "../models/patient";
import checkJwt from "./auth";

@route("/patients")
export default class PatientAPI {
  private readonly _patientService: IPatientService;
  constructor({ patientService }: { patientService: IPatientService }) {
    this._patientService = patientService;
  }

  @GET()
  @before([checkJwt])
  async getAll(req: Request, res: Response) {
    return res.status(200).json(await this._patientService.getAll());
  }

  @POST()
  @before([bodyParser()])
  async post(req: Request, res: Response) {
    return res
      .status(201)
      .json(await this._patientService.insert(new Patient({ ...req.body })));
  }
}
