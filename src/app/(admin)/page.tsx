// import { auth } from '@/src/auth.config';
import { auth } from '@/auth.config';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getKpis, getRoomStatusSummary, getCheckoutReminders, getTodaysArrivals } from '@/actions';

export default async function AdminPage() {
  const session = await auth();

  // Redirigir si no hay sesión o si el usuario no está autenticado
  if (!session || !session.user) {
    redirect('/public');
  }

  // Verificar si el usuario tiene permisos de administrador
  if (session.user.rol !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">No Autorizado</h1>
        <p className="mt-2 text-gray-600">No tienes permisos para acceder a esta página.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  // Obtener datos del dashboard
  const kpis = await getKpis();
  const roomStatusSummary = await getRoomStatusSummary();
  const checkoutReminders = await getCheckoutReminders();
  const todaysArrivals = await getTodaysArrivals();

  return (
    <div className="p-6">
      {/* Encabezado */}
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <p>Bienvenido, {session.user.name} ({session.user.rol}).</p>

      {/* Sección de KPIs */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Indicadores Clave (KPIs)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Reservas Totales</p>
            <p className="text-2xl font-bold">{kpis.totalReservations}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Habitaciones Ocupadas</p>
            <p className="text-2xl font-bold">{kpis.occupiedRooms}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Ingreso Total</p>
            <p className="text-2xl font-bold">${kpis.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Resumen de Estado de Habitaciones */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Estado de Habitaciones</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Libres</p>
            <p className="text-2xl font-bold">{roomStatusSummary.libres}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Ocupadas</p>
            <p className="text-2xl font-bold">{roomStatusSummary.ocupadas}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">En Limpieza</p>
            <p className="text-2xl font-bold">{roomStatusSummary.limpieza}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Reservadas</p>
            <p className="text-2xl font-bold">{roomStatusSummary.reservadas}</p>
          </div>
        </div>
      </div>

      {/* Recordatorios de Check-out Pendientes */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recordatorios de Check-out Pendientes</h2>
        <ul className="mt-4 space-y-2">
          {checkoutReminders.length > 0 ? (
            checkoutReminders.map((reminder) => (
              <li key={reminder.id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold">{reminder.huesped.nombre}</p>
                <p className="text-gray-600 text-sm">Habitación: {reminder.habitacion.numero}</p>
                <p className="text-gray-600 text-sm">Monto Pendiente: ${reminder.factura?.total.toFixed(2)}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No hay recordatorios pendientes para hoy.</p>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Llegadas de Hoy</h2>
        <ul className="mt-4 space-y-2">
          {todaysArrivals.length > 0 ? (
            todaysArrivals.map((arrival) => (
              <li key={arrival.id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold">{arrival.huesped.nombre}</p>

                {/* Mostrar todas las habitaciones asociadas a la reserva */}
                {arrival.detalleReservas.map((detalle) => (
                  <div key={detalle.id}>
                    <p className="text-gray-600 text-sm">Habitación: {detalle.habitacion.numero}</p>
                  </div>
                ))}

                <p className="text-gray-600 text-sm">
                  Check-in: {new Date(arrival.fechaIngreso).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No hay llegadas programadas para hoy.</p>
          )}
        </ul>
      </div>

      {/* Botón para Reportes */}
      <div className="mt-6">
        <Link href="/reports" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Ver Reportes
        </Link>
      </div>

      {/* {/* Opciones de Gestión */}
      {/* <div className="mt-6">
        <h2 className="text-xl">Opciones de Gestión</h2>
        <ul className="mt-2 space-y-2">
          <li>
            <Link href="/reservations" className="text-blue-600 hover:underline">
              Gestionar Reservas
            </Link>
          </li>
          <li>
            <Link href="/rooms" className="text-blue-600 hover:underline">
              Gestionar Habitaciones
            </Link>
          </li>
          <li>
            <Link href="/users" className="text-blue-600 hover:underline">
              Gestionar Usuarios
            </Link>
          </li>
        </ul>
      </div>
      */}
    </div>
  );
}