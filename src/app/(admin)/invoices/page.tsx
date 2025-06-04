import { getInvoices } from '@/actions';
import InvoiceGrid from '@/components/invoice/InvoiceGrid';

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Facturas</h1>
      <InvoiceGrid invoices={invoices} />
    </div>
  );
}