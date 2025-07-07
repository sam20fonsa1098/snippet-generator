import { Router } from "express";
import {
    createSnippetMiddleware,
    getSnippetByIdMiddleware,
    listAllSnippetsMiddleware
} from "../middlewares/snippet.middlewares";

const snippetsRouter = Router();

snippetsRouter.get("/:id", getSnippetByIdMiddleware);
snippetsRouter.get("/", listAllSnippetsMiddleware); 
snippetsRouter.post("/", createSnippetMiddleware);

export { snippetsRouter };