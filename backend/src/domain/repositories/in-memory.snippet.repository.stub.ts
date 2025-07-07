import { Snippet } from "../entities/snippet";
import { NotFoundError } from "../errors/not-found.error";
import { ISnippetRepository } from "./i.snippet.repository";

export class InMemorySnippetRepository implements ISnippetRepository {
    public snippets: Snippet[] = [];

    async getById(id: string): Promise<Snippet> {
        const snippet = this.snippets.find(snippet => snippet.id === id);

        if (!snippet) {
            throw new NotFoundError(`Not found Snippet with id: ${id}`);
        }

        return snippet;
    }

    async listAll(): Promise<Snippet[]> {
        return this.snippets;
    }

    async create(snippet: Snippet): Promise<Snippet> {
        this.snippets.push(snippet);
        return snippet;
    }
}