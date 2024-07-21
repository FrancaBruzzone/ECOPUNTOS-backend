import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { configureServer } from './data/config/configureServer';

const app = express();
const port = 8080;

async function main() {
    const app = await configureServer();

    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}

main().catch((error) => {
    process.exit(1);
});
