import { CreateSnippetDTO } from "../../../application/dtos/create.snippet.dto";
import { SnippetDTO } from "../../../application/dtos/snippet.dto";
import { CreateSnippetUseCase } from "../../../application/use-cases/create.snippet.use-case";
import { GetSnippetByIdUseCase } from "../../../application/use-cases/get.snippet.use-case";
import { ListAllSnippetsUseCase } from "../../../application/use-cases/list-all.snippets.use-case";
import { SingletonSnippetRepository } from "../../databases/shared/repositories/singleton.snippet.repository";
import { SingletonAIProvider } from "../providers/AI/singleton.ai.provider";

export class SnippetService {
    private static snippetService: SnippetService;
    private readonly createSnippetUseCase: CreateSnippetUseCase;
    private readonly getSnippetByIdUseCase: GetSnippetByIdUseCase;
    private readonly listAllSnippetsUseCase: ListAllSnippetsUseCase;

    private constructor() {
        this.createSnippetUseCase = new CreateSnippetUseCase(
            SingletonAIProvider.getInstance(),
            SingletonSnippetRepository.getInstance()
        );
        this.getSnippetByIdUseCase = new GetSnippetByIdUseCase(
            SingletonSnippetRepository.getInstance()
        );
        this.listAllSnippetsUseCase = new ListAllSnippetsUseCase(
            SingletonSnippetRepository.getInstance()
        );
    }

    public static getInstance(): SnippetService {
        if (!SnippetService.snippetService) {
            SnippetService.snippetService = new SnippetService();
        }
        return SnippetService.snippetService;
    }

    public async createSnippet(dto: CreateSnippetDTO): Promise<SnippetDTO> {
        return this.createSnippetUseCase.execute(dto);
    }

    public async getSnippetById(id: string): Promise<SnippetDTO> {
        return this.getSnippetByIdUseCase.execute(id);
    }

    public async listAllSnippets(): Promise<SnippetDTO[]> {
        return this.listAllSnippetsUseCase.execute();
    }
}