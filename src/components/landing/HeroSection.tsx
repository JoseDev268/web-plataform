'use client';

import Image from "next/image";
import Link from "next/link";

export  function HeroSection() {
    return (
        <section className="relative h-[500px] overflow-hidden">
            {/* Imagen de Fondo */}
            <Image
                src="/images/logo-hotel.png" // Asegúrate de tener esta imagen en tu carpeta pública
                alt="Hotel Perla del Lago"
                fill
                className="object-cover object-center brightness-75"
                priority
            />

            {/* Contenido Encima de la Imagen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenido al Hotel Perla del Lago</h1>
                <p className="text-lg md:text-xl mb-8">Tu refugio ideal en Copacabana</p>
                <Link href="/reservations">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                        Reservar Ahora
                    </button>
                </Link>
            </div>
        </section>
    );
}