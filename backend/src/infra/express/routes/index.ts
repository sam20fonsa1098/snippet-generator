import { Router } from "express";
import { snippetsRouter } from "./snippet.routes";

const router = Router();

router.use("/snippets", snippetsRouter);

export { router };