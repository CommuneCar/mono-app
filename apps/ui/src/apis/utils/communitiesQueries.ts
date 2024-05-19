import { Community } from '@communetypes/Community';

const getUpdateCommunityQuery = (community: Community) => {
  return `
mutation {
  updateCommunityById(
    input: { id: ${community.id}, communityPatch: { description: "${community.description}", title: "${community.title}" } }
  ) {
    community {
      description
      id
      lat
      long
      ownerId
      title
      userCommunitiesByCommunityId {
        totalCount
        nodes {
          userByUserId {
            profileImage
          }
        }
      }
    }
  }
}
`;
};

const getCreateCommunityQuery = (
  userId: number,
  communityNew: Omit<Community, 'id'>,
) => {
  return `
    mutation {
  createCommunity(
    input: {
      community: {
        ownerId: ${userId}, 
        title: "${communityNew.title}",
         description: "${communityNew.description}"
      }
    }
  ) {
    community {
      id
      ownerId
      title
      description
      lat
      long
      userCommunitiesByCommunityId {
        totalCount
        nodes {
          userByUserId {
            profileImage
          }
        }
      }
    }
  }
}
  `;
};
export { getUpdateCommunityQuery, getCreateCommunityQuery };
