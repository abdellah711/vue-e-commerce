import type { Product } from "@/types/product";
import axios from "axios";


const Axios = axios.create({
    baseURL: import.meta.env.VITE_SUPABASE_URL,
    params: {
        apikey: import.meta.env.VITE_SUPABASE_APIKEY,
    }
});

export const getAllProducts = () => Axios.get<Product[]>('products').then(res => res.data);

export const getProductById = (id: number) => Axios.get<Product[]>(`products?id=eq.${id}`).then(res => res.data[0]);