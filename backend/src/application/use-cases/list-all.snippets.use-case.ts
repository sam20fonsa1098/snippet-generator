import { ISnippetRepository } from "../../domain/repositories/i.snippet.repository";
import { SnippetDTO } from "../dtos/snippet.dto";

export class ListAllSnippetsUseCase {
    constructor(
        private readonly snippetRepository: ISnippetRepository
    ) {}

    public async execute(): Promise<SnippetDTO[]> {
        return await this.snippetRepository.listAll();
    }
}