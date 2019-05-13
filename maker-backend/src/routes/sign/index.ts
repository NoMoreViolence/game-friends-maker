import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { authorize$ } from '@middlewares';
import { googleLoginEffect$, googleRegisterEffect$, tokenCheckEffect$ } from './effects';

const register$: RouteEffect = EffectFactory.matchPath('/register/google')
  .matchType('POST')
  .use(googleRegisterEffect$);

const login$: RouteEffect = EffectFactory.matchPath('/login/google')
  .matchType('POST')
  .use(googleLoginEffect$);

const tokenCheck$: RouteEffect = EffectFactory.matchPath('/check')
  .matchType('GET')
  .use(tokenCheckEffect$);

const profileRoutes$ = combineRoutes('', { effects: [tokenCheck$], middlewares: [authorize$] });
export default combineRoutes('/sign', { effects: [register$, login$, profileRoutes$] });
