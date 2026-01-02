export function unflattenText(flat: { [key: string]: any }): { [key: string]: any } {
  const nested: { [key: string]: any } = {};

  Object.keys(flat).forEach(key => {
    const parts = key.split('.');
    let current = nested;

    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        current[part] = flat[key];
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    });
  });

  return nested;
}
