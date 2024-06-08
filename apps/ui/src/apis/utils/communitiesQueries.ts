import { Community } from '@communetypes/Community';

const getFetchAllCommunitiesQuery = () => {
  return `
    query {
      allCommunities {
        nodes {
          id
          title
          description
          lat
          long
          baseLocationName
          userCommunitiesByCommunityId {
            nodes {
              userByUserId {
                profileImage
              }
            }
          }
        }
      }
    }`;
};

const getUpdateCommunityQuery = (community: Community) => {
  const locationFields = getLocationFields(community);
  return `
mutation {
  updateCommunityById(
    input: { 
      id: ${community.id}, 
      communityPatch: { 
        description: "${community.description}", 
        title: "${community.title}", 
        ${locationFields} 
      } 
    }
  ) {
    community {
      description
      id
      lat
      long
      ownerId
      title
      baseLocationName
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
    ${communityNew.location?.name ? `baseLocationName: "${communityNew.location.name}"` : ''}
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
      baseLocationName
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
export {
  getUpdateCommunityQuery,
  getCreateCommunityQuery,
  getFetchAllCommunitiesQuery,
};
