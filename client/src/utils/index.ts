export const noop = () => {};

export const formatNumber = (value: number) => new Intl.NumberFormat().format(value);
