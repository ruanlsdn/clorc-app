import axios from 'axios';
import { iCard, PaginatedResponse } from '../interfaces';

const axiosCardService = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1/card',
});

export const getCardsPaginated = async (
  userId: string, 
  page: number = 1, 
  limit: number = 15, 
  search?: string
): Promise<PaginatedResponse<iCard>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) {
    params.append('search', search);
  }
  
  const response = await axiosCardService.get<PaginatedResponse<iCard>>(`/user/${userId}/paginated?${params}`);
  return response.data;
};

export const getCards = async (userId: string) => {
  const response = await axiosCardService.get(`/user/${userId}`);
  return response.data;
};

export default axiosCardService;
