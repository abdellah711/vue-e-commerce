export interface Order {
  id: number;
  created_at: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  total: number;
  email: string;
}