'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const faqData = [
    {
        question: '¿Cuál es el horario de check-in y check-out?',
        answer:
            'El check-in está disponible a partir de las 15:00 horas, y el check-out debe realizarse antes de las 12:00 horas.',
    },
    {
        question: '¿Ofrecen transporte desde el aeropuerto?',
        answer:
            'Sí, ofrecemos servicio de transporte desde el aeropuerto. Por favor, contáctenos con anticipación para coordinar los detalles.',
    },
    {
        question: '¿Se permiten mascotas en el hotel?',
        answer:
            'Sí, aceptamos mascotas en algunas habitaciones. Asegúrate de indicarlo al realizar tu reserva.',
    },
    {
        question: '¿Qué servicios incluye la tarifa de la habitación?',
        answer:
            'La tarifa incluye acceso a la piscina, gimnasio y desayuno buffet. Otros servicios pueden tener un costo adicional.',
    },
    {
        question: '¿Cómo puedo modificar o cancelar mi reserva?',
        answer:
            'Puedes modificar o cancelar tu reserva a través de nuestra página web o contactando directamente con nuestro equipo de atención al cliente.',
    },
];

export function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <button
                                className="flex items-center justify-between w-full text-left"
                                onClick={() => toggleAnswer(index)}
                            >
                                <h3 className="text-lg font-semibold">{item.question}</h3>
                                {activeIndex === index ? (
                                    <ChevronUpIcon className="w-6 h-6 text-blue-600" />
                                ) : (
                                    <ChevronDownIcon className="w-6 h-6 text-blue-600" />
                                )}
                            </button>
                            {activeIndex === index && (
                                <p className="mt-4 text-gray-700">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}