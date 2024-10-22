
import pg from 'pg'; 
import { db } from './config.js';

const pool = new pg.Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
})

export default pool;