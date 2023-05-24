import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { GlobalState, processes } from '../../utils/globalState';
import { pool } from '../../utils/db';

export default function ProductScreen(props) {
  const { product } = props;
  /* eslint-disable-next-line */
  const { state, dispatch } = useContext(GlobalState);
  /*
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return  <Layout title="Product Not Found"> Product Not Found</Layout>
  }
  */
  if (!product) {
    return <Layout title="Product Not Found"> Product Not Found</Layout>;
  }

  const addToCartHandler = () => {
    dispatch({
      type: processes.CART_ADD_cartItem,
      payload: { product, quantity: 1 },
    });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  /*
  const { data: arrayOfProductOjects } = await axios.get(
    `/api/products/${product.idProduct}`
  );
  const [firstProducObject] = arrayOfProductOjects;
  */

  const [arrayOfProductOjects] = await pool.execute(
    'select * from products where products.slug = ?',
    [slug]
  );
  const [firstProductObject] = arrayOfProductOjects;

  return {
    props: {
      product: firstProductObject ? firstProductObject : null,
    },
  };
}
