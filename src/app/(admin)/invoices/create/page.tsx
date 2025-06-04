import InvoiceForm from '@/components/invoice/InvoiceForm';

export default function CreateInvoicePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Factura</h1>
      <InvoiceForm />
    </div>
  );
}