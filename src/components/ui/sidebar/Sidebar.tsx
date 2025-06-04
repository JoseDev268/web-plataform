"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout } from "@/actions";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.rol === "ADMIN";

  return (
    <div>
      {/* Fondo oscuro */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Efecto blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Menú lateral */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[350px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* Botón de cierre */}
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={() => closeMenu()}
        />

        {/* Campo de búsqueda */}
        <div className="relative mt-10">
          <IoSearchOutline size={20} className="absolute top-2 left-2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-gray-50 rounded pl-10 py-2 pr-10 border border-gray-200 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>

        {/* Enlaces del menú */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={24} className="text-gray-600" />
              <span className="ml-3 text-lg">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={closeMenu}
              className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={24} className="text-gray-600" />
              <span className="ml-3 text-lg">Reservas</span>
            </Link>
          </>
        )}

        {/* Botón de cierre de sesión */}
        {isAuthenticated && (
          <button
            className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => logout()}
          >
            <IoLogOutOutline size={24} className="text-gray-600" />
            <span className="ml-3 text-lg">Cerrar sesión</span>
          </button>
        )}

        {/* Enlace de inicio de sesión */}
        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={closeMenu}
          >
            <IoLogInOutline size={24} className="text-gray-600" />
            <span className="ml-3 text-lg">Iniciar sesión</span>
          </Link>
        )}

        {/* Opciones de administrador */}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-5" />

            <Link
              href="/admin/rooms"
              onClick={closeMenu}
              className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={24} className="text-gray-600" />
              <span className="ml-3 text-lg">Habitaciones</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={closeMenu}
              className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={24} className="text-gray-600" />
              <span className="ml-3 text-lg">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};