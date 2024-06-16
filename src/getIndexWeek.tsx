
export function getIndexWeek(): number {
  const countWeek = 2;
  const now = new Date();
  let date;
  if (now.getMonth() < 9) date = new Date(`${now.getFullYear() - 1}-09-01T00:00:00.000Z`);
  else date = new Date(`${now.getFullYear()}-09-01T00:00:00.000Z`);

  const weekIndex = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7)) % countWeek;

  return +weekIndex + 1;
}
