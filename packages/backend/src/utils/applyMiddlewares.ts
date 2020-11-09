import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  APIGatewayProxyCallback,
} from 'aws-lambda';

// AE : additional event
// AC : additional context
export type Handler<AE = {}, AC = {}> = (
  event: APIGatewayProxyEvent & AE,
  context: Context & AC,
  callback: APIGatewayProxyCallback,
) => Promise<APIGatewayProxyResult>;

// NAE : prev additional event
// NAC : prev additional context
// PAE : prev additional event
// PAC : prev additional context
export type Middleware<NAE = {}, NAC = {}, PAE = {}, PAC = {}> = (
  handler: Handler<NAE, NAC>,
) => Handler<PAE, PAC>;

export function applyMiddlewares<AE1, AC1>(
  middleware1: Middleware<AE1, AC1>,
): Middleware<AE1, AC1>;
export function applyMiddlewares<AE1, AC1, AE2, AC2>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
): Middleware<AE1 & AE2, AC1 & AC2>;
export function applyMiddlewares<AE1, AC1, AE2, AC2, AE3, AC3>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
): Middleware<AE1 & AE2 & AE3, AC1 & AC2 & AC3>;
export function applyMiddlewares<AE1, AC1, AE2, AC2, AE3, AC3, AE4, AC4>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
): Middleware<AE1 & AE2 & AE3 & AE4, AC1 & AC2 & AC3 & AC4>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
): Middleware<AE1 & AE2 & AE3 & AE4 & AE5, AC1 & AC2 & AC3 & AC4 & AC5>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
): Middleware<
  AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
  AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14,
  AE15,
  AC15
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
  middleware15: Middleware<
    AE15,
    AC15,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14 &
    AE15,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14 &
    AC15
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14,
  AE15,
  AC15,
  AE16,
  AC16
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
  middleware15: Middleware<
    AE15,
    AC15,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14
  >,
  middleware16: Middleware<
    AE16,
    AC16,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14 &
    AE15 &
    AE16,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14 &
    AC15 &
    AC16
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14,
  AE15,
  AC15,
  AE16,
  AC16,
  AE17,
  AC17
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
  middleware15: Middleware<
    AE15,
    AC15,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14
  >,
  middleware16: Middleware<
    AE16,
    AC16,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15
  >,
  middleware17: Middleware<
    AE17,
    AC17,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14 &
    AE15 &
    AE16 &
    AE17,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14 &
    AC15 &
    AC16 &
    AC17
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14,
  AE15,
  AC15,
  AE16,
  AC16,
  AE17,
  AC17,
  AE18,
  AC18
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
  middleware15: Middleware<
    AE15,
    AC15,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14
  >,
  middleware16: Middleware<
    AE16,
    AC16,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15
  >,
  middleware17: Middleware<
    AE17,
    AC17,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16
  >,
  middleware18: Middleware<
    AE18,
    AC18,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16 &
      AE17,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16 &
      AC17
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14 &
    AE15 &
    AE16 &
    AE17 &
    AE18,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14 &
    AC15 &
    AC16 &
    AC17 &
    AC18
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14,
  AE15,
  AC15,
  AE16,
  AC16,
  AE17,
  AC17,
  AE18,
  AC18,
  AE19,
  AC19
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
  middleware15: Middleware<
    AE15,
    AC15,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14
  >,
  middleware16: Middleware<
    AE16,
    AC16,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15
  >,
  middleware17: Middleware<
    AE17,
    AC17,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16
  >,
  middleware18: Middleware<
    AE18,
    AC18,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16 &
      AE17,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16 &
      AC17
  >,
  middleware19: Middleware<
    AE19,
    AC19,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16 &
      AE17 &
      AE18,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16 &
      AC17 &
      AC18
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14 &
    AE15 &
    AE16 &
    AE17 &
    AE18 &
    AE19,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14 &
    AC15 &
    AC16 &
    AC17 &
    AC18 &
    AC19
>;
export function applyMiddlewares<
  AE1,
  AC1,
  AE2,
  AC2,
  AE3,
  AC3,
  AE4,
  AC4,
  AE5,
  AC5,
  AE6,
  AC6,
  AE7,
  AC7,
  AE8,
  AC8,
  AE9,
  AC9,
  AE10,
  AC10,
  AE11,
  AC11,
  AE12,
  AC12,
  AE13,
  AC13,
  AE14,
  AC14,
  AE15,
  AC15,
  AE16,
  AC16,
  AE17,
  AC17,
  AE18,
  AC18,
  AE19,
  AC19,
  AE20,
  AC20
>(
  middleware1: Middleware<AE1, AC1>,
  middleware2: Middleware<AE2, AC2, AE1, AC1>,
  middleware3: Middleware<AE3, AC3, AE1 & AE2, AC1 & AC2>,
  middleware4: Middleware<AE4, AC4, AE1 & AE2 & AE3, AC1 & AC2 & AC3>,
  middleware5: Middleware<
    AE5,
    AC5,
    AE1 & AE2 & AE3 & AE4,
    AC1 & AC2 & AC3 & AC4
  >,
  middleware6: Middleware<
    AE6,
    AC6,
    AE1 & AE2 & AE3 & AE4 & AE5,
    AC1 & AC2 & AC3 & AC4 & AC5
  >,
  middleware7: Middleware<
    AE7,
    AC7,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6
  >,
  middleware8: Middleware<
    AE8,
    AC8,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7
  >,
  middleware9: Middleware<
    AE9,
    AC9,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8
  >,
  middleware10: Middleware<
    AE10,
    AC10,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9
  >,
  middleware11: Middleware<
    AE11,
    AC11,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10
  >,
  middleware12: Middleware<
    AE12,
    AC12,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11
  >,
  middleware13: Middleware<
    AE13,
    AC13,
    AE1 & AE2 & AE3 & AE4 & AE5 & AE6 & AE7 & AE8 & AE9 & AE10 & AE11 & AE12,
    AC1 & AC2 & AC3 & AC4 & AC5 & AC6 & AC7 & AC8 & AC9 & AC10 & AC11 & AC12
  >,
  middleware14: Middleware<
    AE14,
    AC14,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13
  >,
  middleware15: Middleware<
    AE15,
    AC15,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14
  >,
  middleware16: Middleware<
    AE16,
    AC16,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15
  >,
  middleware17: Middleware<
    AE17,
    AC17,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16
  >,
  middleware18: Middleware<
    AE18,
    AC18,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16 &
      AE17,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16 &
      AC17
  >,
  middleware19: Middleware<
    AE19,
    AC19,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16 &
      AE17 &
      AE18,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16 &
      AC17 &
      AC18
  >,
  middleware20: Middleware<
    AE20,
    AC20,
    AE1 &
      AE2 &
      AE3 &
      AE4 &
      AE5 &
      AE6 &
      AE7 &
      AE8 &
      AE9 &
      AE10 &
      AE11 &
      AE12 &
      AE13 &
      AE14 &
      AE15 &
      AE16 &
      AE17 &
      AE18 &
      AE19,
    AC1 &
      AC2 &
      AC3 &
      AC4 &
      AC5 &
      AC6 &
      AC7 &
      AC8 &
      AC9 &
      AC10 &
      AC11 &
      AC12 &
      AC13 &
      AC14 &
      AC15 &
      AC16 &
      AC17 &
      AC18 &
      AC19
  >,
): Middleware<
  AE1 &
    AE2 &
    AE3 &
    AE4 &
    AE5 &
    AE6 &
    AE7 &
    AE8 &
    AE9 &
    AE10 &
    AE11 &
    AE12 &
    AE13 &
    AE14 &
    AE15 &
    AE16 &
    AE17 &
    AE18 &
    AE19 &
    AE20,
  AC1 &
    AC2 &
    AC3 &
    AC4 &
    AC5 &
    AC6 &
    AC7 &
    AC8 &
    AC9 &
    AC10 &
    AC11 &
    AC12 &
    AC13 &
    AC14 &
    AC15 &
    AC16 &
    AC17 &
    AC18 &
    AC19 &
    AC20
>;
export function applyMiddlewares<AE, AC>(...middlewares: Middleware<AE, AC>[]) {
  return (handler: Handler<AE, AC>): Handler<{}, {}> =>
    middlewares.reverse().reduce((acc, curr) => curr(acc), handler as any);
}
