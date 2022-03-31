import { Response } from "express";

export const setResponseHeader = (res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
}