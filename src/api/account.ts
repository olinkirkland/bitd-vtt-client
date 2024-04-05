import axios from 'axios';

export async function createAccount(username: string, password: string) {
  const response = await axios.post('/account', {
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
