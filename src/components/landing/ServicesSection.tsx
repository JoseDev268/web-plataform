import Image from "next/image";
import { IoRestaurant, IoRestaurantOutline, IoWifi, IoWifiOutline } from "react-icons/io5";

export function ServicesSection() {
    const services = [
        {
            icon: <IoRestaurantOutline size={50} className="text-black" />,
            title: 'Restaurante',
            description: 'Sabores locales e internacionales.',
        },
        {
            icon: <IoWifiOutline size={50} className="text-black" />,
            title: 'Wi-Fi Gratis',
            description: 'Conexión rápida y segura en todo el hotel.',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols- gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <div className="flex justify-center mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}