import React, { useState } from "react";
import { FormField } from "@/models/FormField";

export interface FormProps<T> {
  fields: FormField<T, keyof T>[];
  onSubmit: (data: T) => void;
  initialValues?: T;
}

export default function Form<T>({
  fields,
  onSubmit,
  initialValues,
}: FormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues || ({} as T));

  const handleChange = (key: keyof T, value: number | string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="flex flex-col gap-4"
    >
      {fields.map((field) => (
        <div key={String(field.key)} className="flex flex-col">
          <label className="font-medium">{field.label}</label>
          {field.type === "select" ? (
            <select
              className="border p-2"
              value={String(formData[field.key])}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              {field.options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="border p-2"
              type={field.type}
              value={String(formData[field.key] || "")}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Salvar
      </button>
    </form>
  );
}
