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
    where: {
      ...(findValue.searchInput.trim() === '' ? {} : { name: Like(`%${findValue.searchInput.trim()} #%`) }),
      ...(findValue.game.length === 0 ? {} : { name: findValue.game }),
      isMatched: false,
      updatedAt: AfterDate(subMinutes(new Date(), 10)),
      deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull()
    },
    ...option
  });
