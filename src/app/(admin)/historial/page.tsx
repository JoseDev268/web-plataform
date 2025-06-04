import HistorialHospedajes from '@/components/hospedajes/HistorialHospedajes';

export default function HistorialPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Historial de Hospedajes</h1>
            <HistorialHospedajes />
        </div>
    );
}