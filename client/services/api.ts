import axios from 'axios';
import type { Experience, Booking, Slot, PromoCode, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Experience Service
export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get<ApiResponse<Experience[]>>('/experiences');
    return response.data.data || [];
  },

  getById: async (id: string): Promise<{ experience: Experience; slots: Slot[] }> => {
    const response = await api.get<ApiResponse<{ experience: Experience; slots: Slot[] }>>(`/experiences/${id}`);
    return response.data.data || { experience: {} as Experience, slots: [] };
  },
};

// Booking Service
export const bookingService = {
  create: async (bookingData: Booking): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData);
    return response.data.data || {} as Booking;
  },
};

// Promo Code Service
export const promoService = {
  validate: async (code: string): Promise<PromoCode> => {
    const response = await api.post<ApiResponse<PromoCode>>('/promo/validate', { code });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Invalid promo code');
    }
    return response.data.data || { code: '', discount: 0, type: 'fixed' };
  },
};

export default api;
