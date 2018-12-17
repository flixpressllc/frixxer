type ObjectExclude<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export function removeProps<
  T extends object,
  U extends keyof T,
  Z = { [P in U]: any }
>(obj: T, ...propNames: U[]): ObjectExclude<T, Z> {
  const objClone = { ...obj };
  propNames.forEach(p => delete objClone[p]);
  return objClone;
}
