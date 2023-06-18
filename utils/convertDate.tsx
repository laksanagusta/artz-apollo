export const convertDate = (date: string): string => {
  const resultDate = new Date(parseInt(date));
  return resultDate.toLocaleString("sv");
};
