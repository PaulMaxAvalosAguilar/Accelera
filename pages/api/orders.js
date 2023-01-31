import { getSession } from 'next-auth/react';
import { pool } from '../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).redirect('/login');
  }
  const { user } = session;
  const { email } = user;
  const { fullName, address, country, city, postalCode } =
    req.body.shippingAddress;
  const { paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    req.body;

  //STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d')
  var firstResult = await pool.execute(
    `INSERT INTO orders (idUser,
      shippingadress_fullname, shippingadress_adress, shippingadress_country, shippingadress_city, shippingadress_postalCode, 
      paymenthMethod, itemsPrice, shippingPrice,
       taxPrice, totalPrice, isPaid, isDelivered) 
       SELECT idUsers,
       ?, ?, ?, ?, ?,
       ?, ? , ?,
       ?, ?, ?, ?
       FROM users WHERE email = ? LIMIT 1;`,
    [
      fullName,
      address,
      country,
      city,
      postalCode,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      false,
      false,
      email,
    ]
  );
  const [resultSetHeader] = firstResult;
  const { insertId } = resultSetHeader;

  req.body.productsIds.map(async (product) => {
    await pool.execute(
      `INSERT INTO orderproducts 
      (idProduct, idOrder, boughtPrice, quantity)
       VALUES (?, ?, ?, ?);`,
      [product.idProduct, insertId, product.price, product.quantity]
    );
  });

  return res.status(200).json(insertId);
};

export default handler;
