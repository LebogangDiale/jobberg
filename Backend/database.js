require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user:'adelaide',
    host:'129.232.211.166',
    password:'password123',
    database:'jobberg',
    port:5432,
})

// const connection_string = `postgres://admin:${process.env.DB_PASSWORD}@localhost:5432/db_jobberg`;

// const pool = new Pool({
//     connectionString: connection_string
// });


console.log("The pool is open");
module.exports = pool;
