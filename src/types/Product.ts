export type Product = {
  category: string;
  name: string;
  unity: boolean;
  price: number;
  expense: boolean;
}

export type ProductDatabase = {
  category: string;
  name: string;
  unity: boolean;
  price: number;
  expense: boolean;
  id: string;
}

export type ProductClientTitle = {
  title?: string | null;
  date: Date;
  category: string;
  product: string;
  unity: boolean;
  amount: number;
  price: number;
  expense: boolean;
};
