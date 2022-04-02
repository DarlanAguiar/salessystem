export const getCurrentMonth = () => {
  const now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

export const fromatDate = (date: Date): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export const formatCurrentMonth = (currentMonth: string): string => {
  const [year, month] = currentMonth.split('-');
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  return `${months[Number(month) - 1]} de ${year}`;
};

export const getDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateTimeZone = (date: string) => {
  const tempDate = new Date(date);
  tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset());

  return tempDate.getTime();
};

export const formatFinalDate = (endDate: string) => {
  const date = new Date(endDate);

  date.setDate(date.getDate() + 2);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatInitialMonth = (year: number, month: number) => {
  const date = formatDateTimeZone(
    `${year}-${String(month).padStart(2, '0')}-01`
  );
  return date;
};

export const formatFinalMonth = (year: number, month: number) => {
  const date = formatDateTimeZone(
    `${year}-${String(month + 1).padStart(2, '0')}-01`
  );
  return date;
};
