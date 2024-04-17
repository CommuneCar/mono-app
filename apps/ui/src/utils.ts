export const getRandomOption = (options: string[]) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};
