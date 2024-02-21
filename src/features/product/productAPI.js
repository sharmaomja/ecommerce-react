export async function fetchAllProducts() {
  try {
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
}

export async function fetchProductsByFilters(filter, sort, pagination) {
  try {
    let queryString = '';
    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length) {
        queryString += `${key}=${categoryValues}&`;
      }
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }

    const response = await fetch('http://localhost:8080/products?' + queryString);
    const data = await response.json();
    const totalItems = +response.headers.get('X-Total-Count');
    return { data: { products: data, totalItems } };
  } catch (error) {
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:8080/categories');
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
}

export async function fetchBrands() {
  try {
    const response = await fetch('http://localhost:8080/brands');
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
}

