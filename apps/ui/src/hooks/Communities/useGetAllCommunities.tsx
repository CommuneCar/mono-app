import { Community, Ride } from '@communecar/types';

import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

import { getRandomOption } from '../../utils';

const options = [tlv, apple, camera];

const picturesUrl = [
  getRandomOption(options),
  getRandomOption(options),
  getRandomOption(options),
  getRandomOption(options),
  getRandomOption(options),
];

const communities: Community[] = [
  {
    id: '1',
    name: 'Travel friends Haifa - Tel Aviv',
    description:
      'A Commute traveling each morning from Haifa to Tel Aviv and back each evening.',
    numberOfMembers: 20,
    picturesUrl,
  },
  {
    id: '2',
    description:
      'The biggest israeli community of Apple fans traveling to new stores and events together.',
    name: 'Apple Friends - IL',
    numberOfMembers: 50,
    picturesUrl,
  },
  {
    id: '3',
    name: 'Camera Buddies  - photo fun!',
    description: 'A group of hobby photographers traveling together',
    numberOfMembers: 5,
    picturesUrl,
  },
];

const rides: Ride[] = [
  {
    driver: { name: 'Zoe Shwartz', id: '7' },
    departureTime: new Date(Date.now() + 60 * 60000), // Adding 60 minutes to the current time
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocationName: 'Rotchild street, Tel Aviv',
    startLocation: [32.063898, 34.773855],
    png: getRandomOption(options),
    destinationName: 'Pardesia',
    destination: [1, 2],
  },
  {
    driver: { name: 'Dar Nachmani', id: '2' },
    departureTime: new Date(Date.now() + 120 * 60000),
    communityName: 'Apple Friends - IL',
    png: getRandomOption(options),
    startLocationName: 'Efraim Katzir street, Hod Hasharon',
    startLocation: [32.166401, 34.900587],
    destinationName: 'Modiin',
    destination: [1, 2],
  },
  {
    driver: { name: 'Avi Ron', id: '4' },
    departureTime: new Date(Date.now() + 50 * 60000),
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocationName: 'Weizman street, Petah Tikva',
    startLocation: [32.078195, 34.87304],
    destinationName: 'Holon',
    destination: [1, 2],
    png: getRandomOption(options),
  },
  {
    driver: { name: 'Tal Kovler', id: '6' },
    departureTime: new Date(Date.now() + 25 * 60000),
    communityName: 'Apple Friends - IL',
    startLocationName: "Pe'er street, Haifa",
    startLocation: [32.799783, 35.009874],
    destinationName: 'The Golan',
    destination: [1, 2],
    png: getRandomOption(options),
  },
];

const useGetAllCommunities = () => {
  return communities;
};

const useGetAllRides = () => {
  return rides;
};

export { useGetAllCommunities, useGetAllRides };
