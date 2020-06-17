import { Channel, Team } from '@gql/models';
import { CommonService, TeamService } from '@gql/services';
import { Authorized, FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver((of) => Channel)
export class ChannelResolver {
  constructor(private teamService: TeamService, private commonService: CommonService) {}

  @Authorized()
  @FieldResolver((type) => Team)
  async team(@Root() channel: Channel) {
    const nullableTeam = await this.teamService.getTeamById(channel.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return team.toObject();
  }
}
