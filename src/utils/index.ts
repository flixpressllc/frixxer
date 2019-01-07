export function removeProps<T extends object, U extends keyof T>(
  obj: T,
  ...propNames: U[]
): Pick<T, Exclude<keyof T, U>> {
  const objClone = { ...obj };
  propNames.forEach(p => delete objClone[p]);
  return objClone;
}

export function removeNonAttributePropsAnd<
  O extends React.HTMLAttributes<HTMLElement> & { [s: string]: any },
  U extends keyof O
>(obj: O, ...additionalProps: U[]): React.HTMLAttributes<HTMLElement> {
  const objClone = { ...obj };
  const propNamesToRemove = Object.keys(objClone)
    .filter(name => /[A-Z0-9]/.test(name) && name !== 'className')
    .concat(additionalProps as string[]);
  propNamesToRemove.forEach(p => delete objClone[p]);
  return objClone;
}

export function nullDispatch() {
  return {};
}

export function mergeClasses(
  ...classes: Array<string | { className?: string }>
): string {
  return classes.reduce((result: string, className) => {
    let newClasses: string | undefined;
    if (typeof className === 'string') {
      newClasses = className;
    } else {
      newClasses = className.className;
    }

    return newClasses ? `${result} ${newClasses}` : result;
  }, '');
}
