import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4001', 
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await api.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

export const signup = async (email: string, password: string, name: string, dob: string, address: string) => {
  const response = await api.post('/auth/signup', { email, password, name, dob, address });
  return response.data;
};

export const changePassword = async (token: string, newPassword: string) => {
  const response = await api.post('/auth/change-password', { newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getMoviesByCategory = async (categoryId: string) => {
  const response = await api.get(`/movies/category/${categoryId}`);
  return response.data;
};

export const updateProfile = async (token: string, profile: any) => {
  const response = await api.put('/users/profile', profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const rateMovie = async (token: string, movieId: string, rating: number) => {
  const response = await api.post(`/ratings`, {movieId, rating }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRecommendedMovies = async (token: string) => {
  const response = await api.get('/recommendations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data)
  return response.data;
};
