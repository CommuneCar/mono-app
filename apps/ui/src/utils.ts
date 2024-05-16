function getRandomOption<T>(options: T[]): T {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export { getRandomOption };
