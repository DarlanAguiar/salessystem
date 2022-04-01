export type DataUserAuthorized = {
  id: string;
  user: string;
};

export type DataTransaction = {
  id: string;
  date: Date;
  category: string;
  product: string;
  unity: boolean;
  amount: number;
  price: number;
  expense: boolean;
};

export type DataModelTransaction = {
  category: string;
  name: string;
  unity: boolean;
  price: number;
  expense: boolean;
  id: string;
};
