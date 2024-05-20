import { Message, MessageType, User } from '@communecar/types';

import { graphqlRequest } from '../graphql';
import { isEmpty } from 'lodash';

const fetchJoinCommunitiesMessages = async (
  userId: number,
): Promise<Message[]> => {
  const allUserOwnerCommunitiesQuery = `{
        allCommunities(condition: {ownerId: ${userId}}){
          nodes {
            id
          }
        }
      }`;

  const currentUserQuery = `{
        userById(id: ${userId}){
          id
          firstName
          lastName
          email
          phoneNumber
          gender
          age
        }
      }`;

  const currentUser = await graphqlRequest<{ userById: User }>(
    currentUserQuery,
  );

  const allUserOwnerCommunities = await graphqlRequest<{
    allCommunities: { nodes: { id: number }[] };
  }>(allUserOwnerCommunitiesQuery).then((result) =>
    result.allCommunities.nodes.map((node) => node.id),
  );
  if (!isEmpty(allUserOwnerCommunities)) {
    const allPendingUsersQuery = getPendingUsersQuery(allUserOwnerCommunities);

    const allPendingUsers = await graphqlRequest<
      Record<
        string,
        {
          id: number;
          title: string;
          userCommunitiesByCommunityId: {
            nodes: {
              status: string;
              userByUserId: User;
            }[];
          };
        }
      >
    >(allPendingUsersQuery);

    return Object.values(allPendingUsers).flatMap((community) => {
      const pendingUsers = community.userCommunitiesByCommunityId.nodes.filter(
        (node) => node.status === 'Pending',
      );

      return pendingUsers.map((user) => ({
        id: community.id + user.userByUserId.id + user.userByUserId.lastName,
        type: MessageType.JOINING_COMMUNITY_REQUEST,
        addresseeUsers: [currentUser.userById],
        entityId: community.id,
        entityName: community.title,
        time: new Date(Date.now()),
        creatorUser: user.userByUserId,
      }));
    });
  }
  return [];
};

const getPendingUsersQuery = (communityIds: number[]) => {
  return `{
        ${communityIds.map((id) => {
          return `community${id}: ${getBasePendingCommunityQuery(id)}`;
        })}
      }`;
};

const getBasePendingCommunityQuery = (commmunityId: number) => {
  return `communityById(id: ${commmunityId}) {
      id
      title
      userCommunitiesByCommunityId {
        nodes {
          status
          userByUserId {
              id
              firstName
              lastName
              email
              phoneNumber
              gender
              age
          }
        }
      }
    }`;
};

export { fetchJoinCommunitiesMessages };
