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

const getLocationFields = (communityNew: Omit<Community, 'id'>) => {
  return `
    ${communityNew.location?.lat ? `lat: ${communityNew.location.lat},` : ''}
    ${communityNew.location?.lon ? `long: ${communityNew.location.lon},` : ''}
  `;
};

const getCreateCommunityQuery = (
  userId: number,
  communityNew: Omit<Community, 'id'>,
) => {
  const locationFields = getLocationFields(communityNew);

  return `
    mutation {
  createCommunity(
    input: {
      community: {
        ownerId: ${userId}, 
        title: "${communityNew.title}",
         description: "${communityNew.description}",
         ${locationFields}
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
