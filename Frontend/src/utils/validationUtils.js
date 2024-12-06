export const isValidReservationTime = (startTime, endTime) => {
  const start = new Date(`2023-01-01T${startTime}`);
  const end = new Date(`2023-01-01T${endTime}`);

  // Validar máximo 2 horas
  const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  if (diffHours > 2 || diffHours <= 0) return false;

  // Validar horarios permitidos
  const currentDay = new Date().getDay();
  const startHour = start.getHours();
  const endHour = end.getHours();

  // Lunes a Viernes: 7am a 10pm
  if (currentDay >= 1 && currentDay <= 5) {
    return startHour >= 7 && endHour <= 22;
  }

  // Sábados: 7am a 2pm
  if (currentDay === 6) {
    return startHour >= 7 && endHour <= 14;
  }

  return false;
};

export const isDateValid = (date) => {
  const today = new Date();
  return date >= today;
};
