export interface Experience {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  description: string;
  fullDescription?: string;
  about?: string;
}

export interface Slot {
  id: string;
  experienceId: string;
  date: string;
  time: string;
  availableSpots: number;
  totalSpots: number;
}

export interface Booking {
  id?: string;
  experienceId: string;
  slotId: string;
  fullName: string;
  email: string;
  quantity: number;
  promoCode?: string;
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  status?: 'pending' | 'confirmed' | 'failed';
  referenceId?: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
