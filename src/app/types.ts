export type Campaign = {
  id?: string;
  name: string;
  keywords: string[];
  bidAmount: number;
  fund: number;
  status: boolean;
  town: string;
  radius: number;
}

export type Account = {
  funds: number;
}
