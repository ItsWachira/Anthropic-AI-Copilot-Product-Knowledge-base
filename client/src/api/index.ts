import axios from 'axios';
import { Post } from '../types';

const  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

// export const fetchPostById = async (id: number): Promise<Post> => {
//   const response = await axios.get(`${API_URL}/posts/${id}`);
//   return response.data;
// };

// export const fetchPostsByCategory = async (category: string): Promise<Post[]> => {
//   const response = await axios.get(`${API_URL}/posts/category/${category}`);
//   return response.data;
// };