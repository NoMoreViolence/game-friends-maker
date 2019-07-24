import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { getPostsEffect$ } from './effects';

const getPosts$: RouteEffect = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getPostsEffect$);

export default combineRoutes('/posts', { effects: [getPosts$] });
