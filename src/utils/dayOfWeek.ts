
export function getDayOfWeek(completeDate: string) {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = new Date(completeDate);
  return daysOfWeek[dayOfWeek.getDay()];
}



