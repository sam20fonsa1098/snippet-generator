import { Snippet } from "../../domain/entities/snippet";

describe("Integration tests for CreateSnippetUseCase", () => {
    let createSnippetUseCase: CreateSnippetUseCase;
  
    beforeAll(() => {
      createSnippetUseCase = new CreateSnippetUseCase(
        new StubAiProvider(),
        new InMemorySnippetRepository()
      );
    });
  
    it("should create a snippet with the provided text and a valid summary", async () => {
      const text = "some text";
  
      const createSnippetDTO: CreateSnippetDTO = {
        text,
      };
  
      const createdSnippet: Snippet = await createSnippetUseCase.execute(createSnippetDTO);
  
      expect(createdSnippet.id).not.toBeNull();
      expect(createdSnippet.text).toBe(text);
      expect(createdSnippet.summary).toBeDefined();
      expect(createdSnippet.summary.length).toBeLessThanOrEqual(Snippet.MAXIMUM_SUMMARY_WORDS);
    });
});