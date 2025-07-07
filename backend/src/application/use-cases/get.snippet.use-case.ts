import { ISnippetRepository } from "../../domain/repositories/i.snippet.repository";
import { SnippetDTO } from "../dtos/snippet.dto";

export class GetSnippetByIdUseCase {
    constructor(
        private readonly snippetRepository: ISnippetRepository
    ) {}

    public async execute(id: string): Promise<SnippetDTO> {
        return await this.snippetRepository.getById(id);
    }
}