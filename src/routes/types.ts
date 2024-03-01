import { Request, Response } from "express";

export type CbRoute = (req: Request, res: Response) => void;

export interface IRoute {
  route: string;
  cb: CbRoute
}

export interface IUser {
  id: number
  name: string
  email: string
}