export const translateOptions = (t, options) =>
  options.map((item) => ({
    label: t(`options.${item.label}`),
    value: item.value,
  }));
