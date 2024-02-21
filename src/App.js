import React, { useEffect } from 'react';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailsPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/Order-success.js';
import UserOrdersPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import AdminHome from './pages/AdminHome.js';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage.js';
import WishlistPage from './pages/Wishlistpage.js';

const router = createBrowserRouter([
  {
    path: '/ecommerce-react',
    element:
      <Home />
  },
  {
    path: '/admin',
    element:
      <AdminHome/>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/wishlist',
    element: <WishlistPage />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetailPage />
  },
  {
    path: '/admin/product-detail/:id',
    element: <AdminProductDetailsPage />
  },
  {
    path: '*',
    element: <PageNotFound  />
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccessPage  />
  },
  {
    path: '/orders',
    element: <UserOrdersPage />
  },
  {
    path: '/profile',
    element: <UserProfilePage />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
]);



function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))   
    }
  }, [dispatch,user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
