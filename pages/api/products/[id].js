import { pool } from '../../../utils/db';

const handler = async (req, res) => {
  const [arrayOfProductOjects] = await pool.execute(
    'select * from products where products.idProduct = ?',
    [req.query.id]
  );

  res.send(arrayOfProductOjects);
};

export default handler;
