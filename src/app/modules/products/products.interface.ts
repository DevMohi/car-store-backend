export type TProduct = {
  name: string;
  brand: string; //BMW
  price: number; //30k
  model: string; //Hybrid
  year: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  image: string;
  productDetails: string;
};
