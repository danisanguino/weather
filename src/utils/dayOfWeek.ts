
export function getDayOfWeek(completeDate: string) {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const numberOfDay = new Date(completeDate).getDay()
  return daysOfWeek[numberOfDay];
}



