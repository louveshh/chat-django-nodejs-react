export const translateOptions = (t, options) =>
  options.map((item) => ({
    label: t(item.label),
    value: item.value,
  }));
