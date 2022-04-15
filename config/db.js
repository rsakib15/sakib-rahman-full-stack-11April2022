const Pool = require("pg").Pool;
const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
}
  
const pool = new Pool(proConfig);
// const pool = new Pool({
//     username:'zcbatsdmzbldlt',
//     host:'ec2-52-3-200-138.compute-1.amazonaws.com',
//     database:'daui9137ehtddp',
//     password:'d533b61f50a421ef7c4f853de22d2b8cd2af938d7384785feae83981a03e0867',
//     port:'5432'
// });

module.exports = pool;