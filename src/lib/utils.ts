const randId = (max: number = 1000) => Math.ceil(Math.random() * max);

export const randInputId = (prefix: string = "input") =>
  `${prefix}-${randId()}`;
