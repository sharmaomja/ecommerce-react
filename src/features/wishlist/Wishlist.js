import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAsync } from '../cart/cartSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import {
  addToWishlist,
  fetchWishlistItemsByUserId,
  deleteItemFromWishlist,
} from './wishlistAPI';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // Fetch wishlist items for the currently logged-in user
    if (user) {
      fetchWishlistItemsByUserId(user.id)
        .then((response) => {
          setWishlistItems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching wishlist items:', error);
        });
    }
  }, [user]);

  const handleCart = (item) => {
    // Add the item to the cart
    const newItem = { ...item, quantity: 1, user: user.id };
    delete newItem['id'];
    dispatch(addToCartAsync(newItem));

    // Remove the item from the wishlist
    deleteItemFromWishlist(item.id)
      .then(() => {
        // After successful removal, update the local state
        setWishlistItems((items) => items.filter((i) => i.id !== item.id));
      })
      .catch((error) => {
        console.error('Error removing item from wishlist:', error);
      });
  };

  return (
    <div className="mx-auto mt-8 bg-white max-w-8xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-700">Wishlist</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {wishlistItems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.href}>{item.title}</a>
                      </h3>
                      <p className="ml-4">₹{item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleCart(item)}
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => deleteItemFromWishlist(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-2"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/cart" className="text-indigo-600 hover:underline mt-4 block">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-2">
            View Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
