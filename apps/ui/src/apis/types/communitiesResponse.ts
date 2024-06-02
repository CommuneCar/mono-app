interface UpdateCommunityResponse {
  updateCommunityById: {
    community: CommunityNode;
  };
}

interface CreateCommunityResponse {
  createCommunity: {
    community: CommunityNode;
  };
}

interface CommunityNode {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  lat: number;
  long: number;
  baseLocationName: string;
  userCommunitiesByCommunityId: {
    totalCount: number;
    nodes: UserCommunityNode[];
  };
}
interface UserCommunityNode {
  userByUserId: UserNode;
}
interface UserNode {
  profileImage: string | null;
}

export type {
  UserNode,
  UserCommunityNode,
  UpdateCommunityResponse,
  CommunityNode,
  CreateCommunityResponse,
};
