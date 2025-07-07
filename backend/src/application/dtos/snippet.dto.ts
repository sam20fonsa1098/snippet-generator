import { CreateSnippetDTO } from "./create.snippet.dto";

export interface SnippetDTO extends CreateSnippetDTO{
    id: string;
    summary: string;
}