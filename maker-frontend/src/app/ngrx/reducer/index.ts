import { signReducer } from './sign.reducer';
import { metaReducer } from './meta.reducer';
import { MetaReducer } from '@ngrx/store';

const rootMetaReducer: MetaReducer<any> = metaReducer();
export const reducer = {
  user: rootMetaReducer(signReducer)
};

export { signReducer, metaReducer };
