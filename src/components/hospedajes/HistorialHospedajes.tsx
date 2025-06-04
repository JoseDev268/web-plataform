'use client'; // Indica que este es un componente del lado del cliente

import { useEffect, useState } from 'react';
import { getHistorialHospedajes } from '@/actions/dashboard/get-historial-hospedajes';

interface HistorialHospedajesProps { }

export default function HistorialHospedajes({ }: HistorialHospedajesProps) {
    const [historial, setHistorial] = useState<any[]>([]); // Reemplaza `any` con el tipo adecuado basado en tu esquema Prisma

    useEffect(() => {
        const fetchHistorial = async () => {
            const data = await getHistorialHospedajes();
            setHistorial(data);
        };

        fetchHistorial();
    }, []);

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Historial de Hospedajes</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Huésped</th>
                        <th className="py-2 px-4 text-left">Habitación</th>
                        <th className="py-2 px-4 text-left">Tipo de Habitación</th>
                        <th className="py-2 px-4 text-left">Fecha de Ingreso</th>
                        <th className="py-2 px-4 text-left">Fecha de Salida</th>
                        <th className="py-2 px-4 text-left">Total Pagado</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map((hospedaje) => (
                        <tr key={hospedaje.id} className="border-t border-gray-200">
                            <td className="py-2 px-4">{hospedaje.huesped.nombre}</td>
                            <td className="py-2 px-4">{hospedaje.habitacion.numero}</td>
                            <td className="py-2 px-4">{hospedaje.habitacion.tipoHabitacion.nombre}</td>
                            <td className="py-2 px-4">
                                {new Date(hospedaje.fechaIngreso).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">
                                {new Date(hospedaje.fechaSalida).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">
                                ${hospedaje.factura?.total.toFixed(2) || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}