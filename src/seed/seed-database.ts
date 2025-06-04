import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  // 1. Borrar registros previos
  await Promise.all([
    await prisma.mensaje.deleteMany(),
    await prisma.auditoria.deleteMany(),
    await prisma.pago.deleteMany(),
    await prisma.factura.deleteMany(),
    await prisma.fichaHospedaje.deleteMany(),
    await prisma.detalleReservacionHuesped.deleteMany(),
    await prisma.detalleReservacion.deleteMany(),
    await prisma.reserva.deleteMany(),
    await prisma.huesped.deleteMany(),
    await prisma.habitacion.deleteMany(),
    await prisma.tipoHabitacion.deleteMany(),
    await prisma.piso.deleteMany(),
    await prisma.user.deleteMany(),
  ]);

  const { users, pisos, tipoHabitaciones, habitaciones, huespedes, reservas, checkins, facturas, pagos, auditorias, mensajes } = initialData;

  // 2. Crear usuarios
  await prisma.user.createMany({
    data: users,
  });

  // 3. Crear pisos
  await prisma.piso.createMany({
    data: pisos,
  });

  // 4. Crear tipos de habitación
  await prisma.tipoHabitacion.createMany({
    data: tipoHabitaciones,
  });

  // 5. Mapear tipos de habitación y pisos
  const tiposHabitacionDB = await prisma.tipoHabitacion.findMany();
  const tiposHabitacionMap = tiposHabitacionDB.reduce((map, tipo) => {
    map[tipo.nombre] = tipo.id;
    return map;
  }, {} as Record<string, string>);

  const pisosDB = await prisma.piso.findMany();
  const pisosMap = pisosDB.reduce((map, piso) => {
    map[piso.numero] = piso.id;
    return map;
  }, {} as Record<number, string>);

  // 6. Crear habitaciones
  for (const habitacion of habitaciones) {
    await prisma.habitacion.create({
      data: {
        numero: habitacion.numero,
        tipoHabitacionId: tiposHabitacionMap[habitacion.tipoHabitacionNombre],
        pisoId: pisosMap[habitacion.pisoNumero],
        estado: habitacion.estado,
      },
    });
  }

  // 7. Crear huéspedes
  await prisma.huesped.createMany({
    data: huespedes,
  });

  // 8. Mapear huéspedes
  const huespedesDB = await prisma.huesped.findMany();
  const huespedesMap = huespedesDB.reduce((map, huesped) => {
    map[huesped.ci] = huesped.id;
    return map;
  }, {} as Record<string, string>);

  // 9. Mapear habitaciones
  const habitacionesDB = await prisma.habitacion.findMany();
  const habitacionesMap = habitacionesDB.reduce((map, habitacion) => {
    map[habitacion.numero] = habitacion.id;
    return map;
  }, {} as Record<number, string>);

  // 10. Crear reservas y detalles
  for (const reserva of reservas) {
    const reservaDB = await prisma.reserva.create({
      data: {
        huespedId: huespedesMap[reserva.huespedCi],
        estado: reserva.estado,
        fechaIngreso: new Date(reserva.fechaIngreso),
        fechaSalida: new Date(reserva.fechaSalida),
      },
    });

    for (const detalle of reserva.detalles) {
      const detalleDB = await prisma.detalleReservacion.create({
        data: {
          reservacionId: reservaDB.id,
          habitacionId: habitacionesMap[detalle.habitacionNumero],
          precio: detalle.precio,
        },
      });

      for (const huespedCi of detalle.huespedesCi) {
        await prisma.detalleReservacionHuesped.create({
          data: {
            detalleReservacionId: detalleDB.id,
            huespedId: huespedesMap[huespedCi],
          },
        });
      }
    }
  }

  // 11. Crear fichas de hospedaje
  for (const checkin of checkins) {
    const fichaDB = await prisma.fichaHospedaje.create({
      data: {
        huespedId: huespedesMap[checkin.huespedCi],
        habitacionId: habitacionesMap[checkin.habitacionNumero],
        fechaIngreso: new Date(checkin.fechaIngreso),
        fechaSalida: new Date(checkin.fechaSalida),
        estado: checkin.estado,
      },
    });

    // Actualizar facturas con fichaHospedajeId
    const factura = facturas.find(f => f.fichaHospedajeId === '');
    if (factura) {
      factura.fichaHospedajeId = fichaDB.id;
    }
  }

  // 12. Crear facturas
  for (const factura of facturas) {
    const facturaDB = await prisma.factura.create({
      data: {
        fichaHospedajeId: factura.fichaHospedajeId,
        estado: factura.estado,
        total: factura.total,
      },
    });

    // Actualizar pagos con facturaId
    const pagosFactura = pagos.filter(p => p.facturaId === '');
    for (const pago of pagosFactura) {
      pago.facturaId = facturaDB.id;
    }
  }

  // 13. Crear pagos
  await prisma.pago.createMany({
    data: pagos,
  });

  // 14. Crear mensajes
  const usersDB = await prisma.user.findMany();
  const usersMap = usersDB.reduce((map, user) => {
    map[user.email] = user.id;
    return map;
  }, {} as Record<string, string>);

  for (const mensaje of mensajes) {
    await prisma.mensaje.create({
      data: {
        canal: mensaje.canal,
        contenido: mensaje.contenido,
        remitente: mensaje.remitente,
        destinatario: mensaje.destinatario,
        estado: mensaje.estado,
        usuarioId: mensaje.usuarioEmail ? usersMap[mensaje.usuarioEmail] : null,
        huespedId: mensaje.huespedCi ? huespedesMap[mensaje.huespedCi] : null,
      },
    });
  }

  // 15. Crear auditorías
  const entidadesMap: Record<string, string> = {};

  for (const auditoria of auditorias) {
    let entidadId = auditoria.entidadId;

    // Si entidadId está vacío, asignar un ID válido según la entidad
    if (!entidadId) {
      if (auditoria.entidad === 'Reserva') {
        const reservasDB = await prisma.reserva.findMany({ select: { id: true } });
        if (reservasDB.length > 0) {
          entidadesMap['Reserva'] = reservasDB[0].id;
          entidadId = reservasDB[0].id;
        }
      } else if (auditoria.entidad === 'Mensaje') {
        const mensajesDB = await prisma.mensaje.findMany({ select: { id: true } });
        if (mensajesDB.length > 0) {
          entidadesMap['Mensaje'] = mensajesDB[0].id;
          entidadId = mensajesDB[0].id;
        }
      } else if (auditoria.entidad === 'Huesped') {
        const huespedesDB = await prisma.huesped.findMany({ select: { id: true } });
        if (huespedesDB.length > 0) {
          entidadesMap['Huesped'] = huespedesDB[0].id;
          entidadId = huespedesDB[0].id;
        }
      }
      // Añadir más casos según las entidades que desees auditar
    }

    await prisma.auditoria.create({
      data: {
        entidad: auditoria.entidad,
        entidadId: entidadId || entidadesMap[auditoria.entidad] || '', // Fallback si no hay ID
        accion: auditoria.accion,
        descripcion: auditoria.descripcion,
        usuarioId: auditoria.usuarioEmail ? usersMap[auditoria.usuarioEmail] : null,
        createdAt: new Date(), 
      },
    });
  }

  console.log('Seed ejecutado correctamente');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();