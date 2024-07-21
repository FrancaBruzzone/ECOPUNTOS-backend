import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';

export class MySqlConnection {
    private connection?: Connection;

    constructor(private readonly config: ConnectionOptions) {}

    async connect(): Promise<void> {
        try {
            const connection = await mysql.createConnection({
                ...this.config,
                database: undefined,
            });

            const databaseName = this.config.database;
            if (databaseName) {
                await connection.query(
                    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``,
                );
                await connection.changeUser({ database: databaseName });
            } else {
                throw new Error(
                    'No se especificó ninguna base de datos en la configuración',
                );
            }

            this.connection = await mysql.createConnection(this.config);
            console.log('Conexión a MySQL establecida');

            await connection.end();
        } catch (error) {
            console.error('Error al conectar con MySQL:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
            console.log('Conexión a MySQL cerrada');
        }
    }

    getConnection(): Connection {
        if (!this.connection) {
            throw new Error('No hay conexión establecida con MySQL');
        }
        return this.connection;
    }
}
