import { pool } from '../../utils/db';
import data from '../../utils/data';

export default async function handler(req, res) {
  const users = data.users;
  const user = users[1];

  const { products } = data;

  /*
  const result = await pool.query(`CREATE TABLE users (
    idusers INT UNSIGNED NOT NULL AUTOINCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    isAdmin TINYINT NULL,
    PRIMARY KEY (idusers))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;`);
  */

  /*
  const result = await pool.execute(
    `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?);`,
    [user.name, user.email, user.password, user.isAdmin]
  );*/

  /*
  const [results] = await pool.execute(
    `SELECT * FROM new_schema.users where email = 'admin@example.com'`
  );
  results.map((object) => {
    const { name, email, password, isAdmin } = object;
    console.log(name, email, password, isAdmin);
  });

  results[0].name;

  if (results.length) {
    console.log(results[0].name);
  }*/

  /*
  products.map(async (product) => {
    await pool.execute(
      `INSERT INTO products (name, slug, category, image, price, brand, rating, numReviews,
      countInStock, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        product.name,
        product.slug,
        product.category,
        product.image,
        product.price,
        product.brand,
        product.rating,
        product.numReviews,
        product.countInStock,
        product.description,
      ]
    );
  });
  */

  return res.status(200).json('results');
}
/*
const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
*/
