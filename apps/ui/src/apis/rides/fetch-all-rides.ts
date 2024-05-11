import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

import { getRandomOption } from '../../utils';
import { Ride } from '@communecar/types';

const options = [tlv, apple, camera];

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

const fetchAllRides = () => {
  return rides;
};

export { fetchAllRides };
