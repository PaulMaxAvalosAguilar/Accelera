//GlobalState
import { Cart, processes } from '../utils/Cart.js';
import { useContext } from 'react';
//Authentication
import { signOut, useSession } from 'next-auth/react';
//Component lifecycle and local state
import React, { useEffect, useState } from 'react';
//Next
import Head from 'next/head';
import Link from 'next/link';
//GUI
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
//Components

export default function Layout({ title, children }) {
  //GlobalState
  const { state, dispatch } = useContext(Cart);
  const { cart } = state;
  // Authentication
  const { status, data: session } = useSession();
  //LocalState
  const [cartItemsCount, setCartItemsCount] = useState(0);
  //Lifecycle
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  //Event handler
  const logoutClickHandler = () => {
    dispatch({ type: processes.CART_RESET });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            {/*First Link */}
            <Link href="/" className="text-lg font-bold">
              amazona
            </Link>
            {/* First block */}
            <div>
              {/* First link */}
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {/* Second link */}
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <Link className="dropdown-link" href="/profile">
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link className="dropdown-link" href="/order-history">
                        Order History
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p> Copyright 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}
