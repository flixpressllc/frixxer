export function removeProps<T extends object, U extends keyof T>(
  obj: T,
  ...propNames: U[]
): Pick<T, Exclude<keyof T, U>> {
  const objClone = { ...obj };
  propNames.forEach(p => delete objClone[p]);
  return objClone;
}
