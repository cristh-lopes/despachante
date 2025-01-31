"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ImExit } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">Lopes Despachante</div>

      {user && (
        <div className="relative flex items-center gap-2">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Foto do Usuário"
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          ) : (
            <FaUserCircle className="w-[32px] h-[32px]" />
          )}

          {/* Nome do usuário */}
          <span
            className="text-sm cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user.displayName || "Usuário"}
          </span>

          {dropdownOpen && (
            <div className="absolute top-full mt-3 bg-gray-850 text-white rounded shadow-lg w-full p-2">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700 flex items-center gap-2"
              >
                <ImExit className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
