import { Snippet } from '../../../../domain/entities/snippet';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import { ISnippetRepository } from '../../../../domain/repositories/i.snippet.repository';
import { SnippetModel } from '../schemas/snippet.schema';

export class MongoSnippetRepository implements ISnippetRepository {
    async getById(id: string): Promise<Snippet> {
        const snippet = await SnippetModel.findOne({ id }).exec();

        if (!snippet) {
            throw new NotFoundError(`Snippet with id ${id} not found`);
        }

        return new Snippet(snippet.text, snippet.summary, snippet.id);
    }

    async listAll(): Promise<Snippet[]> {
        const snippets = await SnippetModel.find().exec();
        return snippets.map(snippet => new Snippet(snippet.text, snippet.summary, snippet.id));
    }

    async create(snippet: Snippet): Promise<Snippet> {
        let snippetModel = new SnippetModel(snippet);
        snippetModel = await snippetModel.save();
        return new Snippet(snippetModel.text, snippetModel.summary, snippetModel.id);
    }
}