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
  ) 
   {
    community {
      baseLocationName
      description
      id
      lat
      long
      title
      userCommunitiesByCommunityId {
        nodes {
          communityId
          status
          userId
          userByUserId {
            age
            firstName
            email
            gender
            id
            lastName
            password
            phoneNumber
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
        nodes {
          userByUserId {
            profileImage
            age
            email
            firstName
            gender
            lastName
            id
            nodeId
            password
            phoneNumber
          }
          status
          userId
        }
      }
    }
  }
}
  `;
};

const getAllUserCommunityQuery = () => {
  return `
  {
  allUserCommunities {
    nodes {
      communityId
      status
      userId
      userByUserId {
        profileImage
        phoneNumber
        password
        lastName
        id
        gender
        firstName
        email
        age
      }
    }
  }
}

  `;
};

const getUsersForCommunityId = (communityId: number) => {
  return `{
  allUserCommunities(condition: {communityId: ${communityId}}) {
    nodes {
      userByUserId {
        id
        gender
        firstName
        email
        age
        lastName
        phoneNumber
        profileImage
        userCommunitiesByUserId {
          nodes {
            communityId
            status
          }
        }
      }
      userId
    }
  }
}`;
};

export {
  getUpdateCommunityQuery,
  getCreateCommunityQuery,
  getFetchAllCommunitiesQuery,
  getAllUserCommunityQuery,
  getUsersForCommunityId,
};
