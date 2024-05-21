import { RIDERS_AVATAR_COLORS } from './consts';

const getUserInitials = (name: string): string => {
  const splittedName = name.split(' ');
  return `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`.toUpperCase();
};

const getAvatarColour = () =>
  RIDERS_AVATAR_COLORS[Math.floor(Math.random() * RIDERS_AVATAR_COLORS.length)];

export { getUserInitials, getAvatarColour };
