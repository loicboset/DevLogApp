const randomHexColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

export default randomHexColor;
