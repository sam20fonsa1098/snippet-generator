import { Snippet } from "../../domain/entities/snippet";
import { ISnippetRepository } from "../../domain/repositories/i.snippet.repository";
import { InMemorySnippetRepository } from "../../domain/repositories/in-memory.snippet.repository.stub";

describe("ListAllSnippetsUseCase Integration Tests", () => {
    let snippetRepository: ISnippetRepository;
    let listAllSnippets: ListAllSnippetsUseCase;
  
    const testSnippets = [
      new Snippet("first snippet", "first summary"),
      new Snippet("second snippet", "second summary"),
      new Snippet("third snippet", "third summary")
    ];
  
    beforeEach(() => {
      snippetRepository = new InMemorySnippetRepository();
      listAllSnippets = new ListAllSnippetsUseCase(snippetRepository);
    });
  
    it("should return empty array when no snippets exist", async () => {
      const result = await listAllSnippets.execute();
      expect(result).toEqual([]);
    });
  
    it("should return all stored snippets", async () => {
      for (const snippet of testSnippets) {
        await snippetRepository.create(snippet);
      }
  
      const result = await listAllSnippets.execute();
  
      expect(result).toHaveLength(testSnippets.length);
      expect(result).toEqual(expect.arrayContaining(testSnippets));
    });
  
    it("should maintain snippet integrity", async () => {
      const testSnippet = testSnippets[0];
      await snippetRepository.create(testSnippet);
      
      const [result] = await listAllSnippets.execute();
      
      expect(result.text).toBe(testSnippet.text);
      expect(result.summary).toBe(testSnippet.summary);
      expect(result.id).toBeDefined();
    });
  });