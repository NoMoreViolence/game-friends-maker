export const setter = <T, K>(document: T, update: K): void => {
  if (!document) {
    return;
  }

  const entries = Object.entries(update);
  entries.map(([key, value]) => {
    document[key] = value;
  });
};
