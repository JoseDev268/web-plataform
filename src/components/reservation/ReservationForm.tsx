'use client'; // Indica que este es un componente del lado del cliente

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createReservation, getAvailableData } from '@/actions';

// Tipos importados desde tus interfaces
import { Guest } from '@/interfaces/guest.interface';
import { Room } from '@/interfaces/room.interface';

// Esquema de validación usando Zod
const reservationSchema = z.object({
  huespedId: z.string().min(1, 'El huésped es requerido'),
  fechaIngreso: z.date({ required_error: 'La fecha de ingreso es requerida' }),
  fechaSalida: z.date({ required_error: 'La fecha de salida es requerida' }),
  habitaciones: z.array(z.string()).min(1, 'Debe seleccionar al menos una habitación'),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  onSubmitSuccess?: () => void; // Callback opcional para manejar el éxito
}

export default function ReservationForm({ onSubmitSuccess }: ReservationFormProps) {
  const [huespedes, setHuespedes] = useState<Guest[]>([]);
  const [habitaciones, setHabitaciones] = useState<Room[]>([]);
  const [total, setTotal] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      huespedId: '',
      fechaIngreso: new Date(),
      fechaSalida: new Date(),
      habitaciones: [],
    },
  });

  // Observar cambios en las fechas y habitaciones
  const fechaIngreso = watch('fechaIngreso');
  const fechaSalida = watch('fechaSalida');
  const habitacionesSeleccionadas = watch('habitaciones');

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAvailableData();
        setHuespedes(data.huespedes);
        setHabitaciones(data.habitaciones);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  // Calcular el total
  useEffect(() => {
    if (fechaIngreso && fechaSalida && habitacionesSeleccionadas.length > 0) {
      const diffTime = new Date(fechaSalida).getTime() - new Date(fechaIngreso).getTime();
      const numeroNoches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const precioTotal = habitacionesSeleccionadas.reduce((acc, habitacionId) => {
        const habitacion = habitaciones.find((h) => h.id === habitacionId);
        return acc + (habitacion?.tipoHabitacion.precio || 0) * numeroNoches;
      }, 0);

      setTotal(precioTotal);
    } else {
      setTotal(0);
    }
  }, [fechaIngreso, fechaSalida, habitacionesSeleccionadas, habitaciones]);

  // Manejador de envío del formulario
  const onSubmit = async (data: ReservationFormData) => {
    try {
      const result = await createReservation(
        data.huespedId,
        data.fechaIngreso,
        data.fechaSalida,
        data.habitaciones
      );

      if (result.ok) {
        alert('Reserva creada exitosamente');
        onSubmitSuccess?.(); // Llama al callback si existe
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      alert('Ocurrió un error al crear la reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Selector de Huésped */}
      <div>
        <label htmlFor="huespedId" className="block text-sm font-medium text-gray-700">
          Huésped
        </label>
        <select
          id="huespedId"
          {...register('huespedId')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Selecciona un huésped</option>
          {huespedes.map((huesped) => (
            <option key={huesped.id} value={huesped.id}>
              {huesped.nombre}
            </option>
          ))}
        </select>
        {errors.huespedId && (
          <p className="text-red-500 text-sm">{errors.huespedId.message}</p>
        )}
      </div>

      {/* Fecha de Ingreso */}
      <div>
        <label htmlFor="fechaIngreso" className="block text-sm font-medium text-gray-700">
          Fecha de Ingreso
        </label>
        <input
          id="fechaIngreso"
          type="date"
          {...register('fechaIngreso', { valueAsDate: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.fechaIngreso && (
          <p className="text-red-500 text-sm">{errors.fechaIngreso.message}</p>
        )}
      </div>

      {/* Fecha de Salida */}
      <div>
        <label htmlFor="fechaSalida" className="block text-sm font-medium text-gray-700">
          Fecha de Salida
        </label>
        <input
          id="fechaSalida"
          type="date"
          {...register('fechaSalida', { valueAsDate: true })}
          min={fechaIngreso ? new Date(fechaIngreso).toISOString().split('T')[0] : ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.fechaSalida && (
          <p className="text-red-500 text-sm">{errors.fechaSalida.message}</p>
        )}
      </div>

      {/* Habitaciones */}
      <div>
        <label htmlFor="habitaciones" className="block text-sm font-medium text-gray-700">
          Habitaciones
        </label>
        <select
          id="habitaciones"
          multiple
          {...register('habitaciones')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          {habitaciones.map((habitacion) => (
            <option key={habitacion.id} value={habitacion.id}>
              {`Habitación ${habitacion.numero} (${habitacion.tipoHabitacion.nombre}) - $${habitacion.tipoHabitacion.precio}/noche`}
            </option>
          ))}
        </select>
        {errors.habitaciones && (
          <p className="text-red-500 text-sm">{errors.habitaciones.message}</p>
        )}
      </div>

      {/* Total */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Total:</label>
        <p className="text-lg font-bold">${total.toFixed(2)}</p>
      </div>

      {/* Botón de Envío */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Reserva
        </button>
      </div>
    </form>
  );
}