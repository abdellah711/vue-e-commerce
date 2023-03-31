import type { Product } from "@/types/product";
import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:5000/',
});

export const getAllProducts = () => Axios.get<Product[]>('products').then(res => res.data);