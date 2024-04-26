import { ClientCommunity } from '../../types/community-type';
import { getRandomOption } from '../../utils';
import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

const options = [tlv, apple, camera];

const picturesUrl = [
  getRandomOption(options),
  getRandomOption(options),
  getRandomOption(options),
  getRandomOption(options),
  getRandomOption(options),
];

const communities: ClientCommunity[] = [
  {
    name: 'Travel friends Haifa - Tel Aviv',
    description:
      'A Commute traveling each morning from Haifa to Tel Aviv and back each evening.',
    startLocation: 'Rotchild street, Tel Aviv',
    numberOfMembers: 20,
    picturesUrl,
  },
  {
    description:
      'The biggest israeli community of Apple fans traveling to new stores and events together.',
    name: 'Apple Friends - IL',
    startLocation: 'Rotchild street, Tel Aviv',
    numberOfMembers: 50,
    picturesUrl,
  },
  {
    name: 'Camera Buddies  - photo fun!',
    description: 'A group of hobby photographers traveling together',
    startLocation: 'Rotchild street, Tel Aviv',
    numberOfMembers: 5,
    picturesUrl,
  },
];

const useGetAllCommunities = () => {
  return communities;
};

export { useGetAllCommunities };
