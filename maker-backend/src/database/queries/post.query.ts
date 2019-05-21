import { Post } from '@database/models';
import { AfterDate } from '@utils';
import { subMinutes } from 'date-fns';
import { Any, FindManyOptions, IsNull, Like, Not, Repository } from 'typeorm';

export const getPosts = (
  trans: { entity: Repository<Post> },
  findValue: { searchInput: string; game: string[] } = { searchInput: '', game: [] },
  option: FindManyOptions<Post> = {},
  all: boolean = false
): Promise<[Post[], number]> =>
  trans.entity.findAndCount({
    relations: ['game'],
    where:
      Array.isArray(findValue.game) && findValue.game.length !== 0
        ? findValue.game.map(gameName => ({
            ...(findValue.searchInput.trim() === '' ? {} : { name: Like(`%${findValue.searchInput.trim()} #%`) }),
            game: {
              name: gameName
            },
            isMatched: false,
            updatedAt: AfterDate(subMinutes(new Date(), 10)),
            deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull()
          }))
        : {
            ...(findValue.searchInput.trim() === '' ? {} : { name: Like(`%${findValue.searchInput.trim()} #%`) }),
            isMatched: false,
            updatedAt: AfterDate(subMinutes(new Date(), 10)),
            deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull()
          },
    ...option
  });
