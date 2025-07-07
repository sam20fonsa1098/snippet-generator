declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        GEMINI_API_KEY: string;
        MONGO_URI: string;
        MONGO_URI_TEST: string;
    }
}