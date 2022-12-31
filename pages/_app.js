import '../styles/globals.css';
import { CartProvider } from '../utils/Cart';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
