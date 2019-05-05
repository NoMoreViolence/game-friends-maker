import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { authorize$ } from '@middlewares';
import { googleRegisterEffect$ } from './effects';

const register$: RouteEffect = EffectFactory.matchPath('/register/google')
  .matchType('POST')
  .use(googleRegisterEffect$);

// const login$: RouteEffect = EffectFactory.matchPath('/login')
//   .matchType('POST')
//   .use(loginEffect$);

// const profile$: RouteEffect = EffectFactory.matchPath('/')
//   .matchType('GET')
//   .use(profileEffect$);

// const profileRoutes$ = combineRoutes('/profile', { effects: [profile$], middlewares: [authorize$] });
export default combineRoutes('/sign', { effects: [register$] });
