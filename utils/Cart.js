import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const Cart = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};

export const processes = {
  CARD_ADD_ITEM: 1,
  UPDATE_CART_ITEM_QUANTITY: 2,
  CART_REMOVE_ITEM: 3,
  CART_RESET: 4,
  SAVE_SHIPPING_ADDRESS: 5,
  SAVE_PAYMENT_METHOD: 6,
};

function reducer(state, action) {
  var payloadProduct = action.payload; //Expects to receive {product}
  var shippingAdress = action.payload; //Expects to receive {shippingAdress}
  var selectedPaymentMethod = action.payload; //Expects to receive {selectedPaymentMethod}

  switch (action.type) {
    case processes.CARD_ADD_ITEM: {
      const newCartItems = productExistsInCart(
        state.cart.cartItems,
        payloadProduct
      )
        ? findProductAndAddPayloadQuantity(state.cart.cartItems, payloadProduct)
        : [...state.cart.cartItems, payloadProduct];
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: newCartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case processes.UPDATE_CART_ITEM_QUANTITY: {
      const newCartItems = findProductAndUploadQuantity(state, payloadProduct);
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: newCartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case processes.CART_REMOVE_ITEM: {
      const newCartItems = state.cart.cartItems.filter(
        (item) => item.slug !== payloadProduct.slug
      );
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: newCartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case processes.CART_RESET:
      Cookies.remove('cart');
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    case processes.SAVE_SHIPPING_ADDRESS:
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          shippingAddress: {
            ...shippingAdress,
          },
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...shippingAdress,
          },
        },
      };
    case processes.SAVE_PAYMENT_METHOD:
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          paymentMethod: selectedPaymentMethod,
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: selectedPaymentMethod,
        },
      };
    default:
      return state;
  }
}

function findProductAndAddPayloadQuantity(cartItems, payloadProduct) {
  var product = cartItems.map((product) => {
    if (product.name === payloadProduct.name) {
      var totalQuantity = product.quantity + payloadProduct.quantity;
      if (stockIsAvailable(product, totalQuantity)) {
        var productToBeAddedToCart = { ...payloadProduct };
        productToBeAddedToCart.quantity = totalQuantity;
        return productToBeAddedToCart;
      }
      toast.error(
        `Sorry. Product is out of stock, max Stock ${product.countInStock}`
      );
      return product;
    } else {
      return product;
    }
  });

  return product;
}

function findProductAndUploadQuantity(state, payloadProduct) {
  var product = state.cart.cartItems.map((product) => {
    if (product.name === payloadProduct.name) {
      var quantityToAdd = payloadProduct.quantity;
      if (stockIsAvailable(product, quantityToAdd)) {
        var productToBeAddedToCart = { ...payloadProduct };
        productToBeAddedToCart.quantity = quantityToAdd;
        return productToBeAddedToCart;
      }
      toast.error(
        `Sorry. Product is out of stock, max Stock ${product.countInStock}`
      );
      return product;
    } else {
      return product;
    }
  });
  return product;
}

function productExistsInCart(cartItems, product) {
  var productExistsInCart = cartItems.find(
    (item) => item.slug === product.slug
  );

  return productExistsInCart;
}

function stockIsAvailable(product, totalQuantity) {
  return product.countInStock >= totalQuantity ? true : false;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
}
