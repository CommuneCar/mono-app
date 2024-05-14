import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

import { getRandomOption } from '../../utils';
import { Community } from '@communecar/types';

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

const fetchAllCommunities = () => {
  return communities;
};

export { fetchAllCommunities };
