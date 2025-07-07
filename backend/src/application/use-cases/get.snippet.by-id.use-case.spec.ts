import { Snippet } from "../../domain/entities/snippet";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { ISnippetRepository } from "../../domain/repositories/i.snippet.repository";
import { InMemorySnippetRepository } from "../../domain/repositories/in-memory.snippet.repository.stub";
import { GetSnippetByIdUseCase } from "./get.snippet.use-case";

describe("Integration tests for GetSnippetByIdUseCase", () => {
    let snippetRepository: ISnippetRepository;
    let getSnippetById: GetSnippetByIdUseCase;
  
    beforeAll(() => {
      snippetRepository = new InMemorySnippetRepository();
      getSnippetById = new GetSnippetByIdUseCase(snippetRepository);
    });
  
    it("should throw NotFoundError if the snippet does not exist", async () => {
      const nonExistentId = "does-not-exist";
  
      await expect(getSnippetById.execute(nonExistentId)).rejects.toThrow(NotFoundError);
    });
  
    it("should return a snippet when a valid ID is provided", async () => {
      const text = "someText";
      const summary = "some valid summary";
      const snippet = new Snippet(text, summary);
  
      await snippetRepository.create(snippet); // make sure it's persisted in the repository
  
      const foundSnippet = await getSnippetById.execute(snippet.id);
  
      expect(foundSnippet).toBeDefined();
      expect(foundSnippet.id).toBe(snippet.id);
      expect(foundSnippet.text).toBe(text);
      expect(foundSnippet.summary).toBe(summary);
    });
});