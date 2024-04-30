import { getRandomOption } from '../../utils';
import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';
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
    name: 'Travel friends Haifa - Tel Aviv',
    description:
      'A Commute traveling each morning from Haifa to Tel Aviv and back each evening.',
    numberOfMembers: 20,
    picturesUrl,
  },
  {
    description:
      'The biggest israeli community of Apple fans traveling to new stores and events together.',
    name: 'Apple Friends - IL',
    numberOfMembers: 50,
    picturesUrl,
  },
  {
    name: 'Camera Buddies  - photo fun!',
    description: 'A group of hobby photographers traveling together',
    numberOfMembers: 5,
    picturesUrl,
  },
];

const useGetAllCommunities = () => {
  return communities;
};

export { useGetAllCommunities };
