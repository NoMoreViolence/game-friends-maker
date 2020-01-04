import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { MyTeams } from 'graphqls/queries/__generated__/MyTeams';
import { MY_TEAMS } from 'graphqls/queries/MY_TEAMS';

export function useMyTeams(option?: QueryHookOptions<MyTeams, Record<string, any>>) {
  return useQuery<MyTeams>(MY_TEAMS, option);
}
