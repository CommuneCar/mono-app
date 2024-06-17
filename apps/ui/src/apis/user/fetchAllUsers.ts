import { UserStatus } from '@communecar/types';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { graphqlRequest } from '../graphql';

const GET_ALL_USERS_QUERY = `
{
  allUsers {
    nodes {
      email
      firstName
      lastName
      id
      phoneNumber
      profileImage
      userCommunitiesByUserId {
        nodes {
          communityId
          status
        }
      }
    }
  }
}
`;

interface GetAllUsersResponse {
  allUsers: {
    nodes: UserNode[];
  };
}

interface UserNode {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  userCommunitiesByUserId: {
    nodes: userCommunitiesNode[];
  };
}

interface userCommunitiesNode {
  communityId: number;
  status: UserStatus;
}

export const fetchAllUsers = async (): Promise<UsersSelectorOption[]> => {
  try {
    const data = await graphqlRequest<GetAllUsersResponse>(GET_ALL_USERS_QUERY);

    return data.allUsers.nodes.map((user) => {
      const communitiesStatus = user.userCommunitiesByUserId.nodes ?? [];
      return {
        label: `${user.firstName} ${user.lastName}`,
        userId: user.id,
        email: user.email,
        phone: user.phoneNumber,
        avatarUrl: user.profileImage,
        communitiesStatus,
      };
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
