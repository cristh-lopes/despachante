"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaTools, FaFileAlt } from "react-icons/fa"; // Importando ícones

interface SidebarProps {
  currentPath: string;
}

const menuItems = [
  {
    name: "Cadastros",
    path: "/cadastros",
    icon: <FaTools />, 
    subItems: [
      { name: "Serviços", path: "/cadastros/servicos", icon: <FaFileAlt /> },
    ],
  }
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const [openItems, setOpenItems] = useState<string[]>([]); // Array de itens abertos, independente por item

  const isActive = (path: string) => currentPath.includes(path);

  // Função para alternar o estado de abertura/fechamento
  const toggleSubMenu = (itemName: string) => {
    setOpenItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const getPageTitle = () => {
    const activeItem = menuItems.find((item) => isActive(item.path));
    const activeSubItem = menuItems
      .flatMap((item) => item.subItems)
      .find((subItem) => isActive(subItem.path));

    if (activeSubItem) return activeSubItem.name;
    return activeItem ? activeItem.name : "Dashboard";
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="p-4 text-lg font-semibold">{getPageTitle()}</h2>

      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.path}>
            <button
              className={`w-full flex justify-between items-center px-4 py-3 ${
                isActive(item.path)
                  ? "bg-gray-600 hover:bg-gray-550"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
              onClick={() => toggleSubMenu(item.name)}
            >
              <span className="flex items-center gap-2 text-sm">
                {item.icon}
                {item.name}
              </span>
              <FaChevronDown
                className={`transition-transform ${
                  openItems.includes(item.name) ? "rotate-180" : ""
                }`}
              />
            </button>

            {openItems.includes(item.name) && item.subItems && (
              <div className="bg-gray-800 rounded-b-md overflow-hidden">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    className={`block pl-9 pr-4 py-2 text-sm hover:bg-gray-700 ${
                      isActive(subItem.path) ? "bg-gray-750" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {subItem.icon}
                      {subItem.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
