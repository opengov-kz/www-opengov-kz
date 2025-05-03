import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:5173/news', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, title: "Mocked News 1", description: "Description of news 1", date: "2025-02-01", tag: "Tech" },
                { id: 2, title: "Mocked News 2", description: "Description of news 2", date: "2025-02-02", tag: "Law" }
            ])
        );
    }),
];