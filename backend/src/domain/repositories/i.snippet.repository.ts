import { Snippet } from "../entities/snippet";

export interface ISnippetRepository {
    getById(id: string): Promise<Snippet>;
    listAll(): Promise<Snippet[]>;
    create(snippet: Snippet): Promise<Snippet>;
}