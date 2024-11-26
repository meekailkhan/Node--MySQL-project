import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// connetionToDatabase function just a error handler after and all its return only pool after authentication

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});





export default pool
