import { config } from 'dotenv';
import { Snippet } from '../../../../domain/entities/snippet';
import { connectToDatabase, deleteAllCollections, disconnectFromDatabase } from '../connection';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import { MongoSnippetRepository } from './mongo.snippet.repository';

describe("MongoSnippetRepository", () => {
    let repository: MongoSnippetRepository;

    beforeAll(async () => {
        config();
        await connectToDatabase(process.env.MONGO_URI_TEST);
        await deleteAllCollections();
        repository = new MongoSnippetRepository();
    });

    afterAll(async () => {
        await deleteAllCollections();
        await disconnectFromDatabase();
    });
    
    it("should throw NotFoundError when snippet not found", async () => {
        await expect(repository.getById("invalid-snippet-id")).rejects.toThrow(NotFoundError);
    });

    it("should get a snippet by id", async () => {
        const newSnippet = new Snippet("Sample text", "Sample summary");
        const createdSnippet = await repository.create(newSnippet);

        const snippet = await repository.getById(createdSnippet.id);
        expect(snippet).toBeDefined();
        expect(snippet.id).toBe(createdSnippet.id);
    });


    it("should list all snippets", async () => {
        const snippets = await repository.listAll();
        expect(snippets).toBeInstanceOf(Array);
    });

    it("should create a new snippet", async () => {
        const newSnippet = new Snippet("Sample text", "Sample summary");
        const createdSnippet = await repository.create(newSnippet);
        expect(createdSnippet).toBeDefined();
        expect(createdSnippet.text).toBe(newSnippet.text);
        expect(createdSnippet.summary).toBe(newSnippet.summary);
    });
});