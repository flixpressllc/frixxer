export function addToWindow(obj: object) {
  Object.getOwnPropertyNames(obj).forEach(
    name => ((window as any)[name] = (obj as any)[name]),
  );
}
