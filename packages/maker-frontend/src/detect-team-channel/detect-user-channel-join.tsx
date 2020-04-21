import { FC } from 'react';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { useDetectUserChannelJoinId } from 'helpers';

interface Props {
  teamUserJoin: TeamUserJoinFull;
}

export const DetectUserChannelJoin: FC<Props> = ({ teamUserJoin }) => {
  useDetectUserChannelJoinId(teamUserJoin);
  return null;
};
