import axios from './axios';

export async function loginRequest(payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/users/login', payload, config);
    if (response.status === 200) {
      sessionStorage.setItem('userId', response.data.id);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('isAuthenticated', true);
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function registerRequest(payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/users', payload, config);
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}
