import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'cenafamiliar',
  database: 'new_schema',
});

export { pool };
