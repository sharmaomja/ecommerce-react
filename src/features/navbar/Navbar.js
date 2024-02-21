import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, HeartIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { searchProductsAsync } from '../product/productSlice';


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Store', to: '/', current: true },
  { name: 'My Orders', to: '/orders', current: false },
  { name: 'Help and Support', to: '/help', current: false },
];

const userNavigation = [
  { name: 'Your Profile', to: '/profile' },
  { name: 'My Orders', to: '/orders' },
  { name: 'Sign out', to: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavBar({ children }) {

  const items = useSelector(selectItems)
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    dispatch(searchProductsAsync(searchInput)); // Dispatch the search action
  }


  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto px-2 sm:px-6 lg:px-5">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 pl-12">
                      <Link to="/">
                        <img
                          className="h-10 w-10 rounded-md"
                          src="data:image/jpeg;base64,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"
                          alt="Store"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}

                      </div>
                    </div>

                  </div>
                  <div class="container-fluid">
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                      <input
                        className="form-control me-3 h-8 py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style={{ width: '500px' }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-success text-white font-semibold text-xl"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/wishlist">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <HeartIcon className="h-7 w-7" aria-hidden="true" />
                        </button>
                      </Link>

                      <div className="p-2 relative">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon className="h-7 w-7" aria-hidden="true" />
                          </button>
                        </Link>
                        <span className="absolute top-1 right-0 inline-flex items-center justify-center rounded-full bg-cyan-200 h-6 w-6 text-m font-bold text-black">
                          {items.length}
                        </span>
                      </div>


                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3 pr-8">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.to}
                                    className={classNames(
                                      'block px-4 py-2 text-sm',
                                      active ? 'bg-gray-100' : 'text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>

                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {items.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white">
          <div className="mx-auto max-w px-2 py-6 sm:px-6 lg:px-8">
          </div>
        </header>
        <main>
          <div className="bg-white py-2 sm:px-6 lg:px-8">
            <div className="-mt-8"> {/* Add this container div */}
              {children}
            </div>
          </div>

        </main>
      </div>
    </>
  )
}

export default NavBar;