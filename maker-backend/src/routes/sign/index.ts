import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { authorize$ } from '@middlewares';
import { googleLoginEffect$, googleRegisterEffect$ } from './effects';

const register$: RouteEffect = EffectFactory.matchPath('/register/google')
  .matchType('POST')
  .use(googleRegisterEffect$);

const login$: RouteEffect = EffectFactory.matchPath('/login/google')
  .matchType('POST')
  .use(googleLoginEffect$);

// const profile$: RouteEffect = EffectFactory.matchPath('/')
//   .matchType('GET')
//   .use(profileEffect$);

// const profileRoutes$ = combineRoutes('/profile', { effects: [profile$], middlewares: [authorize$] });
export default combineRoutes('/sign', { effects: [register$, login$] });
