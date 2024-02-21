const API_BASE_URL = 'http://localhost:8080'; 

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        reject({ message: errorData.error || 'Failed to create user' });
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error(error);
      reject({ message: 'Internal Server Error' });
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        reject({ message: errorData.error || 'Invalid credentials' });
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error(error);
      reject({ message: 'Internal Server Error' });
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        reject({ message: errorData.error || 'Failed to sign out' });
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error(error);
      reject({ message: 'Internal Server Error' });
    }
  });
}

