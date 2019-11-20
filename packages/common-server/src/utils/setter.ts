export const setter = <T, K>(document: T, update: K): void => {
  if (!document) {
    return;
  }

  const entries = Object.entries(update);
  entries.forEach(([key, value]) => {
    document[key] = value;
  });
};
