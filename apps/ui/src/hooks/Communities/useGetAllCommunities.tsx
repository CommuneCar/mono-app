import { Community } from '@communecar/types';

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

const rides = [
  {
    driver: 'Zoe Shwartz',
    departureTime: new Date(Date.now() + 60 * 60000), // Adding 60 minutes to the current time
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocation: 'Rotchild street, Tel Aviv',
    png: getRandomOption(options),
    destination: 'Pardesia',
  },
  {
    driver: 'Dar Nachmani',
    departureTime: new Date(Date.now() + 120 * 60000),
    communityName: 'Apple Friends - IL',
    png: getRandomOption(options),
    startLocation: 'Efraim Katzir street, Hod Hasharon',
    destination: 'Modiin',
  },
  {
    driver: 'Avi Ron',
    departureTime: new Date(Date.now() + 50 * 60000),
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocation: 'Weizman street, Petah Tikva',
    destination: 'Holon',
    png: getRandomOption(options),
  },
  {
    driver: 'Tal Kovler',
    departureTime: new Date(Date.now() + 25 * 60000),
    communityName: 'Apple Friends - IL',
    startLocation: 'Bla street, Haifa',
    destination: 'The Golan',
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
