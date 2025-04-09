import React from "react"
import {RegisterData, User} from "@/types.tsx";
import {handleResponse} from "@/actions/handleResponse.tsx";
import {clearTokens, getAccessToken, getRefreshToken, saveTokens} from "@/actions/handleToken.tsx";

const API_BASE_URL = '/api/auth';

// Store the current user
let currentUser: User | null = null;

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const setCurrentUser = (user: User): void => {
  currentUser = user;
};

export const handleRegister = async (userData: RegisterData) => {

  try {
    console.log('Registering user:', userData.username);
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await handleResponse(response);
    console.log('Registration successful:', result);
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export const handleLogin = async (event: React.FormEvent<HTMLFormElement>, username: string, password: string) => {
    event.preventDefault() // Prevent the default form submission

    try {
        console.log('Logging in user:', username);
        const response = await fetch(`${API_BASE_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        });
        const tokenResponse = await handleResponse(response);
        console.log('Login successful, saving tokens');
        saveTokens(tokenResponse.access, tokenResponse.refresh);
        
        // Get user information after successful login
        console.log('Fetching user details');
        await fetchCurrentUser();
        
        return tokenResponse;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    console.log('Fetching current user from:', `${API_BASE_URL}/me/`);
    const response = await authFetch(`${API_BASE_URL}/me/`);
    console.log('Current user fetched:', response);
    setCurrentUser(response);
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

export const handleLogout = async () => {
    const refreshToken = getRefreshToken();

    try {
        console.log('Logging out user');
        // This will blacklist the token and not send another one
        const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refresh: refreshToken}),
        });

        await handleResponse(response);
        console.log('Logout successful, clearing tokens');
        clearTokens();
        currentUser = null; // Clear the current user
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};


export const authFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error('Session expired. Please login again.');
  }

  console.log('Making authenticated request to:', url);
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  return handleResponse(response);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
