export function TestimonialsSection() {
    const testimonials = [
      {
        name: 'María López',
        review: '¡Increíble experiencia! El personal fue muy amable y la habitación estaba impecable.',
      },
      {
        name: 'Carlos Gómez',
        review: 'El desayuno buffet fue delicioso y la vista desde la terraza es espectacular.',
      },
      {
        name: 'Ana Pérez',
        review: 'Recomiendo este hotel a todos mis amigos. ¡Sin duda volveré!',
      },
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
                <p className="font-semibold text-blue-600">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }