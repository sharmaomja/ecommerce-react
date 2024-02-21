import { useState, useEffect } from 'react';
import star from '../../../app/star.gif'
import { RadioGroup } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchProductByIdAsync, selectProductById } from '../productSlice';
import { useParams } from 'react-router-dom';
import { selectLoggedInUser } from '../../auth/authSlice';
import { addToCartAsync } from '../../cart/cartSlice';
import { addToWishlistAsync } from '../../wishlist/wishlistSlice';

const colors = [
];

const sizes = [
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
  const user = useSelector(selectLoggedInUser);
  const product = useSelector(selectProductById);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const [dataLoaded, setDataLoaded] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', review);

    // Dispatch the addComment action with the product's id and the new comment.
    dispatch(addComment({ productId: product.id, comment: review }));

    setReview('');
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = () => {
    console.log('Rating Submitted:', rating);
    setRating(0);
    setRatingSubmitted(true);
    setCartAdded(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    console.log(product);
    console.log(user.id);

    const newItem = { ...product, user: user.id };
    delete newItem['id'];
    dispatch(addToWishlistAsync(newItem));
    setWishlistAdded(true);
  };

  const handleCart = (e) => {
    e.preventDefault();
    console.log(product);
    console.log(user.id)
    const newItem = { ...product, quantity: 1, user: user.id }
    delete newItem['id'];
    dispatch(addToCartAsync(newItem));
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id))
      .then(() => {
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setDataLoaded(true);
      });
  }, [dispatch, params.id]);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  function renderRatingStars() {
    const maxRating = 5;
    const starSize = "2rem";

    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${i <= rating ? 'text-yellow-400' : 'text-gray-400'
            }`}
          onClick={() => handleRatingChange(i)}
          style={{ fontSize: starSize }}
        >
          ★
        </span>
      );
    }

    return stars;
  }


  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 lg:block">
              <div className="hidden overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">₹{product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <img
                        key={rating}
                        src={star}
                        className={classNames(
                          product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              {/*Comments*/}
              <div className="mt-10">
                <h2 className="text-xl font-medium text-gray-900">Customer Reviews</h2>
                <ul className="divide-y divide-gray-300">
                  {product.comments.map((comment, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center">
                        <p className="text-gray-900">{comment}</p>
                      </div>
                      {/* You can add more information like the user's name, date, etc. */}
                    </li>
                  ))}
                </ul>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={cartAdded}
                >
                  {cartAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleWishlist}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={wishlistAdded}
                >
                  {wishlistAdded ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              
            {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights && product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-l font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-m text-gray-600">{product.description}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-medium text-gray-900">Add a Review</h3>
                  <form onSubmit={handleReviewSubmit}>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows="4"
                      placeholder="Write your review here..."
                      className="w-full border p-2 rounded-md"
                    ></textarea>
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-indigo-700"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>

                
                <div className="mt-6">
                  <h1 className="text-xl font-medium text-gray-900">Rate the Product</h1>
                  <div className="flex items-center">
                    {renderRatingStars()}
                  </div>
                  <button
                    onClick={handleRatingSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Submit Rating
                  </button>
                  {ratingSubmitted && (
                    <p className="mt-2 text-green-600">Thanks for rating the product</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}