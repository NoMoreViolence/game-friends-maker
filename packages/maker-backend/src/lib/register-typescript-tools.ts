import 'reflect-metadata';
import 'source-map-support/register';
import { register } from 'tsconfig-paths';

register({
  baseUrl: '.',
  paths: {
    '@common-server/*': ['src/common-server/*'],
    '@common-server': ['src/common-server'],
    '@lib/*': ['src/lib/*'],
    '@lib': ['src/lib'],
    '@helpers': ['src/helpers'],
    '@database/*': ['src/database/*'],
    '@database': ['src/database'],
    '@gql/*': ['src/gql/*'],
    '@gql': ['src/gql'],
    '@constants': ['src/constants'],
  },
});
