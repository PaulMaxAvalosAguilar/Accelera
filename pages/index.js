import Layout from '../components/Layout';
import { useContext } from 'react';
import ProductItem from '../components/ProductItem';
import { GlobalState, processes } from '../utils/globalState';
import { pool } from '../utils/db';

export default function Home({ arrayOfProductOjects }) {
  const { dispatch } = useContext(GlobalState);

  function addToCartHandler(product) {
    dispatch({
      type: processes.CART_ADD_cartItem,
      payload: { product, quantity: 1 },
    });
  }

  return (
    <Layout title="HomePage">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {arrayOfProductOjects.map((product) => (
          <ProductItem
            product={product}
            addToCartHandler={addToCartHandler}
            key={product.slug}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const [arrayOfProductOjects] = await pool.execute('select * from products');

  return {
    props: {
      arrayOfProductOjects,
    },
  };
}
