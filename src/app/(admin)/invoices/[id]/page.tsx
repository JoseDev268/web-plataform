import { notFound } from 'next/navigation';
import { getInvoiceById } from '@/actions';
import { updateInvoice } from '@/actions';
import InvoiceDetails from '@/components/invoice/InvoiceDetails';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function InvoiceDetailsPage({ params }: PageProps) {
  const { id } = params;

  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Factura</h1>
      <InvoiceDetails invoice={invoice} />
    </div>
  );
}


const handleUpdateInvoice = async () => {
  try {
    const updatedInvoice = await updateInvoice('invoice-id-123', {
      estado: 'ANULADA', // Valor válido del enum EstadoFactura
      total: 750.0,
    });

    console.log('Factura actualizada:', updatedInvoice);
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
  }
};