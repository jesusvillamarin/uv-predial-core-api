import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Owner, Estate, Debt } from '@entities/index';

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = +process.env.DB_PORT;
const database = process.env.DB_NAME;

const connectionOpts: ConnectionOptions = {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [
        Owner,
        Estate,
        Debt
    ],
    synchronize: false
};

export default createConnection(connectionOpts);