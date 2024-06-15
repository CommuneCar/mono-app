import { UserStatus } from '@communetypes/Enums';

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
  lat?: number;
  long?: number;
  baseLocationName?: string;
  userCommunitiesByCommunityId: {
    nodes: UserCommunityNode[];
  };
}

interface UserCommunityNode {
  userByUserId: UserNode;
  status: UserStatus;
  userId: number;
}
interface UserNode {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  password: string;
  gender: string;
  age: number;
}

interface AllCommunitiesData {
  allCommunities: {
    nodes: CommunityNode[];
  };
}

export type {
  UserNode,
  UserCommunityNode,
  UpdateCommunityResponse,
  CommunityNode,
  CreateCommunityResponse,
  AllCommunitiesData,
};
