export interface ProductItem {
  name: string;
  quantity: number;
}

export interface ShoppingItem {
  id: number;
  title: string;
  items: ProductItem[];
  purchased: boolean;
}
