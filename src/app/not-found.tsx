import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">
        A página que você está procurando não foi encontrada.
      </p>
      <Link href="/" className="text-lg text-blue-600 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
