import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const Cart = createContext();

const initialState = {
  cartState: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : {
        cartItems: [
          //Saves Product object like follows:
          //COUNT(Quantity), (all other fields) GROUP BY slug
          /*
          {
            //DB
            idProduct: '',
            name: '',
            slug: '',
            category: '',
            image: '',
            price: 0,
            brand: '',
            rating: 0,
            numReviews: 0,
            countinStock: 0,
            description: '',
            //App
            quantity: 0,
          },
          */
        ],
        shippingAddress: {
          fullName: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
        },
        invoiceAdress: {
          fullName: '',
          adress: '',
          city: '',
          postalCode: '',
          country: '',
        },
        paymentMethod: '',
      },
};

export const processes = {
  CART_RESET_ALL: 1,
  CART_ADD_cartItem: 2,
  CART_UPDATE_cartItem_quantity: 3, //jpdate cartItem quanity
  CART_DELETE_cartItems: 4, //delete all cartItems
  CART_RESET_cartItems: 5,
  CART_CREATE_shippingAdress: 6,
  CART_UPDATE_shippingAdress: 7,
  CART_DELETE_shippingAdress: 8,
  CART_CLEAR_shippingAdress: 9,
  CART_CREATE_invoiceAdress: 10,
  CART_UPDATE_invoiceAdress: 11,
  CART_DELETE_invoiceAdress: 12,
  CART_CLEAR_invoiceAdress: 13,
  CART_ADD_paymentMethod: 14,
  CART_UPDATE_paymentMethod: 15,
  CART_DELETE_paymentMethod: 16,
};

function reducer(state, action) {
  var shippingAdress = action.payload; //Expects to receive {shippingAdress}
  var selectedPaymentMethod = action.payload; //Expects to receive {selectedPaymentMethod}

  switch (action.type) {
    case processes.CART_RESET_ALL:
      Cookies.remove('cart');
      return {
        ...state,
        cartState: {
          cartItems: [],
          shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
          },
          paymentMethod: '',
        },
      };
    case processes.CART_ADD_cartItem: {
      const { product, quantity } = action.payload; //intended payload
      const newCartItems = productExistsInCart(state, product)
        ? findProductAndAddPayloadQuantity(
            state.cartState.cartItems,
            product,
            quantity
          )
        : [...state.cartState.cartItems, { ...product, quantity }];

      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cartState, cartItems: newCartItems })
      );
      return {
        ...state,
        cartState: { ...state.cartState, cartItems: newCartItems },
      };
    }
    case processes.CART_UPDATE_cartItem_quantity: {
      const { product, quantity } = action.payload; //intended payload
      const newCartItems = productExistsInCart(state, product)
        ? findProductAndUpdateQuantity(state, product, quantity)
        : [...state.cartState.cartItems, { ...product, quantity }];
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cartState, cartItems: newCartItems })
      );
      return {
        ...state,
        cartState: { ...state.cartState, cartItems: newCartItems },
      };
    }
    case processes.CART_DELETE_cartItems: {
      const { product } = action.payload; //intended payload
      console.log(product);
      const newCartItems = state.cartState.cartItems.filter(
        (stateProduct) => stateProduct.slug !== product.slug
      );
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cartState, cartItems: newCartItems })
      );
      return {
        ...state,
        cartState: { ...state.cartState, cartItems: newCartItems },
      };
    }
    case processes.SAVE_SHIPPING_ADDRESS:
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cartState,
          shippingAddress: {
            ...shippingAdress,
          },
        })
      );
      return {
        ...state,
        cartState: {
          ...state.cartState,
          shippingAddress: {
            ...state.cartState.shippingAddress,
            ...shippingAdress,
          },
        },
      };
    case processes.SAVE_PAYMENT_METHOD:
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cartState,
          paymentMethod: selectedPaymentMethod,
        })
      );
      return {
        ...state,
        cartState: {
          ...state.cartState,
          paymentMethod: selectedPaymentMethod,
        },
      };
    default:
      return state;
  }
}

function findProductAndAddPayloadQuantity(cartItems, productToFind, quantity) {
  var returnedCartItems = cartItems.map((stateProduct) => {
    if (stateProduct.name === productToFind.name) {
      var totalQuantity = stateProduct.quantity + quantity;
      if (stockIsAvailable(stateProduct, totalQuantity)) {
        var productToBeAddedToCart = {
          ...productToFind,
          quantity: totalQuantity,
        }; //Important
        return productToBeAddedToCart;
      }
      toast.error(
        `Sorry. Product is out of stock, max Stock ${stateProduct.countInStock}`
      );
      return stateProduct;
    } else {
      return stateProduct;
    }
  });

  return returnedCartItems;
}

function findProductAndUpdateQuantity(state, productToFind, quantity) {
  var returnedCartItems = state.cartState.cartItems.map((stateProduct) => {
    if (stateProduct.name === productToFind.name) {
      var newQuantity = quantity;
      if (stockIsAvailable(stateProduct, newQuantity)) {
        stateProduct.quantity = newQuantity;
        return stateProduct;
      }
      toast.error(
        `Sorry. Product is out of stock, max Stock ${stateProduct.countInStock}`
      );
      return stateProduct;
    } else {
      return stateProduct;
    }
  });
  return returnedCartItems;
}

function productExistsInCart(state, product) {
  var productExistsInCart = state.cartState.cartItems.find(
    (stateProduct) => stateProduct.slug === product.slug
  );

  return productExistsInCart;
}

function stockIsAvailable(product, totalQuantity) {
  return product.countInStock >= totalQuantity ? true : false;
}

export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
}
