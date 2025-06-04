import { ContactForm, HeroSection, RoomsSection, ServicesSection, TestimonialsSection, FaqSection } from "@/components";


export default function PublicPage() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Servicios Destacados */}
      <ServicesSection />

      {/* Habitaciones Disponibles */}
      <RoomsSection />

      {/* Testimonios de Clientes */}
      <TestimonialsSection />

      <FaqSection />

      {/* Formulario de Contacto */}
      <ContactForm />
    </div>
  );
}