import { Request, Response } from "express";
import { SnippetService } from "../../shared/services/snippet.service";


const getSnippetByIdMiddleware = async (req: Request, res: Response) => {
    const snippetId = req.params.id;
    const snippet = await SnippetService.getInstance().getSnippetById(snippetId);

    if (!snippet) {
        res.status(404).json({ error: "Snippet not found" });
        return;
    }
    
    res.status(200).json(snippet);
};


const listAllSnippetsMiddleware = async (req: Request, res: Response) => {
    const snippets = await SnippetService.getInstance().listAllSnippets();
    res.status(200).json(snippets);
}; 


const createSnippetMiddleware = async (req: Request, res: Response) => {
    const snippetData = req.body;
    const newSnippet = await SnippetService.getInstance().createSnippet(snippetData);
    res.status(201).json(newSnippet);
};

export { getSnippetByIdMiddleware, listAllSnippetsMiddleware, createSnippetMiddleware };