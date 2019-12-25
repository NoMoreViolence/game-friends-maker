export const setter = <T>(document: T, update: Partial<T>): void => {
  if (!document) {
    return;
  }

  const entries = Object.entries(update);
  entries.forEach(([key, value]) => {
    document[key] = value;
  });
};
