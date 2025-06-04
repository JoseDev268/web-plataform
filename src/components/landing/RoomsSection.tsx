import Image from "next/image";

export function RoomsSection() {
  const rooms = [
    {
      image: '/images/suite.jpg',
      title: 'Suite de Lujo',
      description: 'Espacio amplio con vista al lago y jacuzzi privado.',
      price: '$200/noche',
    },
    {
      image: '/images/double.jpg',
      title: 'Habitación Doble',
      description: 'Ideal para parejas, con balcón y vistas panorámicas.',
      price: '$120/noche',
    },
    {
      image: '/images/single.jpg',
      title: 'Habitación Individual',
      description: 'Perfecta para viajeros solitarios, cómoda y funcional.',
      price: '$80/noche',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestras Habitaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={room.image} alt={room.title} width={400} height={250} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <p className="text-blue-600 font-bold">{room.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}