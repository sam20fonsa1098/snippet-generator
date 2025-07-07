import { Snippet } from "../../domain/entities/snippet";
import { ISnippetRepository } from "../../domain/repositories/i.snippet.repository";
import { CreateSnippetDTO } from "../dtos/create.snippet.dto";
import { SnippetDTO } from "../dtos/snippet.dto";
import { IAIProvider } from "../providers/AI/i.ai.provider";

export class CreateSnippetUseCase {
    constructor(
        private readonly aiProvider: IAIProvider,
        private readonly snippetRepository: ISnippetRepository
    ) {}

    public async execute(dto: CreateSnippetDTO): Promise<SnippetDTO> {
        const summary = await this.aiProvider.generateSummaryByText(dto.text);

        let snippet = new Snippet(dto.text, summary);
        snippet = await this.snippetRepository.create(snippet);

        return snippet;
    }
}