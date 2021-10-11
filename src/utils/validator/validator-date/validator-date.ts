export const validatorDate = (date: Date): string => {
  if (date) {
    const now = new Date(date);
    const day = now.getDate().toString();
    const month = (new Date(now).getMonth() + 1).toString();
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const fullYear =
      day +
      '/' +
      month +
      '/' +
      year +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
    return fullYear;
  }
  return null;
};
