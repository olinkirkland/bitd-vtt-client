import axios from 'axios';

export async function createAccount(username: string, password: string) {
  const response = await axios.post('/account/create', {
    username,
    password
  });

  return response.data;
}

export async function login(username: string, password: string) {
  const response = await axios.post('/account/login', {
    username,
    password
  });

  return response.data;
}

export async function deleteAccount(password: string) {
  // Delete account logic
}

export async function changePassword(password: string, newPassword: string) {
  // Change password logic
}
