import { MetaReducer } from '@ngrx/store';
import { metaReducer } from './reducer';

export const metaReducers: MetaReducer<any> = metaReducer();
export * from './actions';
export * from './effects';
export { signReducer } from './reducer';
