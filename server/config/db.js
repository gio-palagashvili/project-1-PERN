import pg from "pg";
const Pool = pg.Pool;

const data = {
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "first_db"
}

const pool = new Pool(data);

export default pool;