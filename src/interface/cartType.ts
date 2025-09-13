export interface CartItem {
 id: number;
  name: string;
  price: number;
  originalPrice: number;
  size: string;
  image: string;
  description: string;
  features: string[];
  quantity: number;
}
 
export interface ProductsSectionProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export type CartProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
