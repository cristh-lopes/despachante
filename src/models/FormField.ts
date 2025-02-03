export interface FormField<T, K extends keyof T> {
  label: string;
  key: K;
  type: "text" | "number" | "select";
  options?: { label: string; id: number | string }[];
}
