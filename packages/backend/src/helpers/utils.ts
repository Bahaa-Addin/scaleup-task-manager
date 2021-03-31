export function sequencePromiseT<T>(array: Promise<T>[]): Promise<T[]> {
  return Promise.all(array);
}
export async function sequencePromiseS<T>(record: Record<string, Promise<T>>): Promise<Record<string, T>> {
  const res: Record<string, T> = {};
  for (const [ key, value ] of Object.entries(record)) {
    res[key] = await value;
  }
  return res;
}