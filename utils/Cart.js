import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Cart = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};

function reducer(state, action) {
  var payloadProduct = action.payload; //Expects to receive {...product,quantity}

  switch (action.type) {
    case 'CARD_ADD_ITEM': {
      const newCartItems = productExistsInCart(state, payloadProduct)
        ? state.cart.cartItems.map((product) => {
            if (product.name === payloadProduct.name) {
              var quantityToAdd = product.quantity + payloadProduct.quantity;
              if (stockIsAvailable(product, quantityToAdd)) {
                var productToBeAddedToCart = { ...payloadProduct };
                productToBeAddedToCart.quantity = quantityToAdd;
                return productToBeAddedToCart;
              }
              alert(
                `Sorry. Product is out of Stock, max Stock ${product.countInStock}`
              );
              return product;
            } else {
              return product;
            }
          })
        : [...state.cart.cartItems, payloadProduct];
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: newCartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case 'UPDATE_CART_ITEM_QUANTITY': {
      const newCartItems = state.cart.cartItems.map((product) => {
        if (product.name === payloadProduct.name) {
          var quantityToAdd = payloadProduct.quantity;
          if (stockIsAvailable(product, quantityToAdd)) {
            var productToBeAddedToCart = { ...payloadProduct };
            productToBeAddedToCart.quantity = quantityToAdd;
            return productToBeAddedToCart;
          }
          alert(
            `Sorry. Product is out of Stock, max Stock ${product.countInStock}`
          );
          return product;
        } else {
          return product;
        }
      });
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: newCartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const newCartItems = state.cart.cartItems.filter(
        (item) => item.slug !== payloadProduct.slug
      );
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: newCartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    default:
      return state;
  }
}

function productExistsInCart(state, product) {
  var productExistsInCart = state.cart.cartItems.find(
    (item) => item.slug === product.slug
  );

  return productExistsInCart;
}

function stockIsAvailable(product, totalQuantity) {
  return product.countInStock < totalQuantity ? false : true;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
}
