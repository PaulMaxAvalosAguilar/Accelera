/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import Link from 'next/link';
import { Cart } from '../utils/Cart';

export default function ProductItem({ product }) {
  const { dispatch } = useContext(Cart);

  const addToCartHandler = () => {
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity: 1 } });
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        ></img>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2"> {product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          onClick={addToCartHandler}
          type="button"
        >
          {' '}
          Add to cart
        </button>
      </div>
    </div>
  );
}
