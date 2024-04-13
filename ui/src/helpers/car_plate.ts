export function findCarPlateNumber(message: string): string | undefined {
  const values = transformMessage(message);
  return values.find((value) => checkCarPlatePattern(value));
}

export function checkCarPlatePattern(str: string): boolean {
  const pattern1 = /\d{3}[A-Z]{3}/;
  const pattern2 = /[A-Z]\d{4}[A-Z]/;

  if(str.length !== 6) return false;

  if (pattern1.test(str) || pattern2.test(str)) {
    return true;
  } else {
    return false;
  }
}

function transformMessage(message: string): string[] {
  return message
    .slice(1, -1)
    .split(", ")
    .map((item: string) => item.slice(1, -1));
}
