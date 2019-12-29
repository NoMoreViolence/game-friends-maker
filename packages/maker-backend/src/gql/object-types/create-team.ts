import { User, Team, TeamUserJoin } from '@gql/models';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CreateTeam {
  @Field(type => User)
  user: User;

  @Field(type => Team)
  team: Team;

  @Field(type => TeamUserJoin)
  teamUserJoin: TeamUserJoin;
}
