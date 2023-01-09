/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import Link from 'next/Link';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width="960"
          height="960"
          className="rounded shadow"
        ></Image>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2"> {product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          onClick={() => {
            addToCartHandler(product);
          }}
          type="button"
        >
          {' '}
          Add to cart
        </button>
      </div>
    </div>
  );
}
