import { createContext, useReducer } from 'react';

export const Cart = createContext();

const initialState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CARD_ADD_ITEM': {
      const addedProduct = action.payload;
      const productExistsInCart = state.cart.cartItems.find(
        (item) => item.slug === addedProduct.slug
      );

      const newCartItems = productExistsInCart
        ? state.cart.cartItems.map((product) => {
            if (product.name === addedProduct.name) {
              var totalQuantity = product.quantity + addedProduct.quantity;
              if (product.countInStock < totalQuantity) {
                alert('Sorry. Product is out of Stock');
                return product;
              }
              addedProduct.quantity = totalQuantity;
              return addedProduct;
            } else {
              return product;
            }
          })
        : [...state.cart.cartItems, addedProduct];
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
}
