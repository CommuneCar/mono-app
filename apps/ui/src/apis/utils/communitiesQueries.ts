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
    }
  }
}
`;
};
export { getUpdateCommunityQuery };
