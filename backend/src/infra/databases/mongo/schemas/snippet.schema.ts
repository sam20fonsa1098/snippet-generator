import { Schema, model, Document } from 'mongoose';

export interface ISnippet extends Document {
    id: string;
    text: string;
    summary: string;
}

const snippetSchema = new Schema<ISnippet>({
    id: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    summary: { type: String, required: true }
});

export const SnippetModel = model<ISnippet>('Snippet', snippetSchema);