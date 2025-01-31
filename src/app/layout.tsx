"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/cadastro"].includes(pathname);

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex flex-col max-h-screen`}>
        <header className="bg-gray-800 text-white p-4">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold">Lopes Despachante</h1>
          </div>
        </header>

        {!isAuthPage ? (
          <AuthGuard>
            <div className="flex h-screen overflow-hidden">
              <Sidebar currentPath={pathname} />
              <main className="flex-1 p-6 bg-gray-100">
                <div className="h-full flex justify-center items-center bg-white rounded-md shadow-sm p-8 overflow-y-auto">
                  {children}
                </div>
              </main>
            </div>
          </AuthGuard>
        ) : (
          <div className="h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center bg-gray-100">
              {children}
            </main>
          </div>
        )}

        <footer className="bg-gray-800 text-white p-2">
          <div className="mx-auto text-right">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Lopes Despachante. Todos os
              direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
