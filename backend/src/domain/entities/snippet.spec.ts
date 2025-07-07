describe("Unit tests for the Snippet entity", () => {
    it("should throw InvalidSummaryError for an invalid summary", () => {
      const invalidSummary =
        "The quick brown fox jumps over the lazy dog while the sun sets behind the mountains.";
      const text = "Some text";
  
      expect(() => {
        new Snippet(text, invalidSummary);
      }).toThrow(InvalidSummaryError);
    });
  
    it("should create a Snippet instance with a valid summary", () => {
      const text = "someText";
      const summary = "some valid summary";
      const snippet = new Snippet(text, summary);
  
      expect(snippet.id).not.toBeNull();
      expect(snippet.text).toBe(text);
      expect(snippet.summary).toBe(summary);
    });
  });