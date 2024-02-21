import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders } from '../userSlice';

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [selectedProductToReturn, setSelectedProductToReturn] = useState(null);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);

  if (orders.length === 0) {
    return <div>Loading...</div>;
  }

  const handleReturnExchange = (order) => {
    setSelectedOrder(order);
    setReturnReason(''); // Reset the return reason
    setSelectedProductToReturn(null);
  };

  const handleSelectProductToReturn = (product) => {
    setSelectedProductToReturn(product);
  };

  // Function to submit the return request
  const submitReturnRequest = () => {
    if (selectedProductToReturn) {
      // Handle the return request here for the selected product (e.g., dispatch an action, make an API call, etc.)
      // You can use the selectedOrder, selectedProductToReturn, and returnReason
      console.log('Selected Order:', selectedOrder);
      console.log('Selected Product:', selectedProductToReturn);
      console.log('Return Reason:', returnReason);

      // Reset the selected order, selected product, and return reason
      setSelectedOrder(null);
      setReturnReason('');
      setSelectedProductToReturn(null);
    } else {
      // Handle the case where no product is selected for return
      console.error('Please select a product to return.');
    }
  };

  return (
    <div>
      <div className="mx-auto mt-1 bg-white max-w-8xl px-2 sm:px-2 lg:px-8">
        {orders.map((order) => (
          <div key={order.id}>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-700">Order #: {order.id}</h1>
              <h3 className="text-m my-5 font-semibold tracking-tight text-red-600">Order Status#: {order.status}</h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-4"> {/* Reduced the vertical padding */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-2 flex flex-1 justify-end">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">₹{item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-left text-sm">
                          <div className="text-gray-500">
                            <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                              Qty: {item.quantity}
                            </label>
                          </div>
                          <div className="flex">
                          </div>
                        </div>
                        {selectedProductToReturn === item ? (
                          <div>
                            <label htmlFor="returnReason" className="block text-sm font-medium text-gray-700">
                              Select Reason for Return:
                            </label>
                            <select
                              id="returnReason"
                              name="returnReason"
                              value={returnReason}
                              onChange={(e) => setReturnReason(e.target.value)}
                              className="mt-1 px-8 p-1 rounded-md border border-gray-300" 
                            >
                              <option value="">Select a reason for return                                                                                                                                                                  </option>
                              <option value="Defective">Defective item delivered</option>
                              <option value="Wrong item">Wrong item delivered</option>
                              <option value="Wrong item">Size too small</option>
                              <option value="Wrong item">Size too large</option>
                              {/* Add more reasons as needed */}
                            </select>
                            <button
                              onClick={submitReturnRequest}
                              className="mt-2 px-4 ml-8 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"  
                            >
                              Submit Return Request
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSelectProductToReturn(item)}
                            className="mt-1 px-4 py-1 h-8 bg-red-700 text-white rounded-md hover:bg-red-700"  
                          >
                            Request Return or Exchange
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            
            <div className="mt-4 px-4 py-2">
              <div className="border-t border-gray-200 px-2 py-2 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total items in cart</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-m text-gray-800">Shipping Address:</p>
                <div className="flex justify-between px-2 gap-x-6 py-2">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress ? order.selectedAddress.name : 'No address available'}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.pinCode}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.state}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-black font-semibold">Phone: {order.selectedAddress.phone}</p>
                    <p className="text-sm leading-6 text-gray-700">{order.selectedAddress.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
