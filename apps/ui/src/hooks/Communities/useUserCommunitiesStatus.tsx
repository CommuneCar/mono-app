import { UserStatus } from '@communecar/types';
import { UserCommunitiesStatus } from '../../types/community-type';
import { fetchUserCommunitiesStatus } from '../../apis/communities/fetch-community-user-status';
import { useEffect, useState } from 'react';

const useUserCommunitiesStatus = (userId: string): UserCommunitiesStatus => {
  const [communitiesStatus, setCommunitiesStatus] =
    useState<UserCommunitiesStatus>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserCommunitiesStatus(Number(userId));
        const dataEntries = Object.entries(data);
        const status: UserCommunitiesStatus = {};
        dataEntries.forEach((item) => {
          status[item[0]] = item[1] as UserStatus;
        });
        setCommunitiesStatus(status);
      } catch (err) {
        setError('Failed to fetch user communities status.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading || error) return {}; // or a loading state

  return communitiesStatus;
};

export { useUserCommunitiesStatus };
