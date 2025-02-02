import type { Expense } from "./Expense";
import type { ServiceType } from "./ServiceType";

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  defaultPrice: number;
  expenses: Expense[];
}