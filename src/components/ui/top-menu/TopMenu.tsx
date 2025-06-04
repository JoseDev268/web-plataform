"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { IoSearchOutline, IoCartOutline, IoPersonOutline, IoBedOutline, IoReceiptOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full bg-white shadow-md">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold text-xl`}>
            HotelApp
          </span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:flex space-x-4">
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-100"
          href="/reservations"
        >
          <IoBedOutline className="inline-block w-5 h-5 mr-1" />
          Reservas
        </Link>
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-100"
          href="/rooms"
        >
          <IoBedOutline className="inline-block w-5 h-5 mr-1" />
          Habitaciones
        </Link>
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-100"
          href="/invoices"
        >
          <IoReceiptOutline className="inline-block w-5 h-5 mr-1" />
          Facturas
        </Link>
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-100"
          href="/customers"
        >
          <IoPersonOutline className="inline-block w-5 h-5 mr-1" />
          Clientes
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <Link href="/search" className="p-2 rounded-md transition-all hover:bg-gray-100">
          <IoSearchOutline className="w-6 h-6" />
        </Link>

        {/* Notifications (e.g., pending reservations or messages) */}
        <Link href="/notifications" className="relative">
          <div className="relative">
            {loaded && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                3 {/* Ejemplo: Número de notificaciones */}
              </span>
            )}
            <IoCartOutline className="w-6 h-6" />
          </div>
        </Link>

        {/* Menu Button */}
        <button
          onClick={openSideMenu}
          className="p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};