export interface SalaryInfo {
  hourly: string;
  weekly: string;
  monthly: string;
}

export const calculateSalary = (
  salaryPerHour: number | undefined,
  currency: string = '$'
): SalaryInfo | null => {
  if (salaryPerHour === undefined) {
    return null;
  }

  const HOURS_PER_WEEK = 40;
  const WEEKS_PER_MONTH = 4;

  const formatAmount = (amount: number): string => 
    `${currency}${amount.toFixed(0)}`;

  return {
    hourly: `${formatAmount(salaryPerHour)}/час`,
    weekly: `${formatAmount(salaryPerHour * HOURS_PER_WEEK)}/неделя`,
    monthly: `${formatAmount(salaryPerHour * HOURS_PER_WEEK * WEEKS_PER_MONTH)}/месяц`,
  };
};

export const formatSalaryDisplay = (salaryData: ReturnType<typeof calculateSalary>) => {
  if (!salaryData) {
    return "Зарплата не указана";
  }

  return (
    `
💰 Зарплата (Брутто):
- Почасовая: ${salaryData.hourly}
- За неделю (примерно): ${salaryData.weekly}
- За месяц (примерно): ${salaryData.monthly}

*Конечная сумма (нетто) зависит от индивидуальных налоговых обязательств.
    `
  );
}; 