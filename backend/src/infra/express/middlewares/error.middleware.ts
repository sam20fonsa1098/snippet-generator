import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { DomainError } from "../../../domain/errors/domain.error";
import { ApplicationError } from "../../../application/providers/shared/errors/application.error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof NotFoundError) {
        res.status(404).json({ error: "Snippet not found" });
        return;
    }
    if (error instanceof DomainError || error instanceof ApplicationError) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.status(500).json({ error: "Internal server error" });
};