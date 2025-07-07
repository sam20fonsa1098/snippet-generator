import { ISnippetRepository } from "../../../../domain/repositories/i.snippet.repository";
import { MongoSnippetRepository } from "../../mongo/repositories/mongo.snippet.repository";

export class SingletonSnippetRepository {
  private static instance: ISnippetRepository;

  public static getInstance(): ISnippetRepository {
    if (!SingletonSnippetRepository.instance) {
      SingletonSnippetRepository.instance = new MongoSnippetRepository();
    }
    return SingletonSnippetRepository.instance;
  }
}