import request from 'supertest';
import { app } from '../app';
import { connectToDatabase, deleteAllCollections, disconnectFromDatabase } from '../../databases/mongo/connection';
import { config } from 'dotenv';
import { SnippetService } from '../../shared/services/snippet.service';

describe('Snippets API', () => {

    beforeAll(async () => {
        config();
        await connectToDatabase(process.env.MONGO_URI_TEST);
        await deleteAllCollections();
    });

    afterAll(async () => {
        await deleteAllCollections();
        await disconnectFromDatabase();
    });

    it('POST /snippets should create a new snippet', async () => {
        const text = 'I am trying to create a snippet with supertest';
        const res = await request(app)
        .post('/snippets')
        .send({ text });

        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.text).toBe(text);
        expect(res.body.summary).toBeDefined();
    });

    it('GET /snippets should list all snippets', async () => {
        await Promise.all([
            SnippetService.getInstance().createSnippet({
                text: "Some random text to create the first snippet",
            }),
            SnippetService.getInstance().createSnippet({
                text: "Some random text to create the second snippet",
            })
        ]);

        const res = await request(app).get('/snippets');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('GET /snippets/:id should return one snippet', async () => {
        const text = "Some random text to create the first snippet";
        const snippet = await SnippetService.getInstance().createSnippet({
            text,
        })

        const res = await request(app).get(`/snippets/${snippet.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.text).toBe(text);
        expect(res.body.summary).toBeDefined();
    });

    it('GET /snippets/:id should return 404 if not found', async () => {
        const res = await request(app).get('/snippets/nonexistent-id');
        expect(res.statusCode).toBe(404);
    });
});
