import { NextFunction, Request, Response } from "express";
import SubjectService from "../services/subjects";

class SubjectController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const subjects = await SubjectService.getAll()
        res.status(200).json({data: subjects})
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
        const subjects = await SubjectService.create(req.body)
        res.status(201).json({data: subjects})
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
        const subjects = await SubjectService.update(req.body, req.query.name)
        res.status(200).json({data: subjects})
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
        const subjects = await SubjectService.delete(req.query.name)
        res.status(200).json({data: subjects})
    } catch (error) {
      next(error);
    }
  }

  static async joinSubject(req: Request, res: Response, next: NextFunction) {
    try {
        await SubjectService.joinSubject(req.query.username, req.query.name)
        res.status(200).json({message: "Vinculaciòn exitosa"})
    } catch (error) {
      next(error);
    }
  }


}

export default SubjectController;
