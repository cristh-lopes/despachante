import Button from "@/components/Button";
import Table from "@/components/Table";
import { FaPlusCircle } from "react-icons/fa";
import { Service } from "@/models/Service";
import { ServiceType } from "@/models/ServiceType";
import { Column } from "@/models/Column";

const serviceTypes: ServiceType[] = [
  {
    id: "1",
    name: "Transferência",
    requiredExpenses: ["Taxa Detran", "Taxa Cartório"],
  },
  {
    id: "2",
    name: "Segunda Via de Recibo",
    requiredExpenses: ["Taxa Impressão"],
  },
];

const columns: Column<Service, keyof Service>[] = [
  { title: "Nome do Serviço", key: "name" },
  {
    title: "Tipo",
    key: "type",
    format: (service: Service) => service.type.name,
  },
  {
    title: "Valor Padrão",
    key: "defaultPrice",
    format: (service: Service) => `R$ ${service.defaultPrice.toFixed(2)}`,
  },
  {
    title: "Total de Despesas",
    key: "expenses",
    format: (service: Service) =>
      `R$ ${service.expenses
        .reduce((sum, expense) => sum + expense.value, 0)
        .toFixed(2)}`,
  },
];

const data: Service[] = [
  {
    id: "1",
    name: "Transferência Veicular",
    type: serviceTypes[0],
    defaultPrice: 500,
    expenses: [
      { id: "e1", name: "Taxa Detran", value: 150 },
      { id: "e2", name: "Taxa Cartório", value: 200 },
    ],
  },
  {
    id: "2",
    name: "Segunda Via de Recibo",
    type: serviceTypes[1],
    defaultPrice: 300,
    expenses: [{ id: "e3", name: "Taxa Impressão", value: 100}],
  },
];

export default function Servicos() {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <Button Icon={FaPlusCircle}>Novo Serviço</Button>
      </div>
      <Table columns={columns} data={data} whoIsKey="id" />
    </div>
  );
}
