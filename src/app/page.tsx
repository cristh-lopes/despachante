import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Lopes Despachante</h1>
      <p className="text-lg mb-8">
        Gerencie seus documentos e finanças de forma eficiente.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Login
        </Link>
        <Link
          href="/cadastro"
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
