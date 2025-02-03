import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import type { TableProps } from "./Table";
import Table from "./Table";
import type { FormProps } from "./Form";
import Form from "./Form";

export function DefaultCrud<T>({
  tableProps,
  formProps,
}: {
  tableProps: TableProps<T>;
  formProps: FormProps<T>;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row items-center gap-2">
          {showForm && (
            <FaArrowLeft
              className="w-5 h-5"
              onClick={() => setShowForm(!showForm)}
            />
          )}
          <h1 className="text-2xl font-bold">Serviços</h1>
        </div>
        {!showForm && (
          <Button Icon={FaPlusCircle} onClick={() => setShowForm(!showForm)}>
            Novo
          </Button>
        )}
      </div>
      {showForm ? <Form {...formProps} /> : <Table {...tableProps} />}
    </div>
  );
}
