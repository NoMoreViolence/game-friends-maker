import 'reflect-metadata';
import 'source-map-support/register';
import { register } from 'tsconfig-paths';

register({
  baseUrl: '.',
  paths: {
    '@common-server/*': ['dist/common-server/*'],
    '@common-server': ['dist/common-server'],
    '@lib/*': ['dist/lib/*'],
    '@lib': ['dist/lib'],
    '@helpers': ['dist/helpers'],
    '@database/*': ['dist/database/*'],
    '@database': ['dist/database'],
    '@gql/*': ['dist/gql/*'],
    '@gql': ['dist/gql'],
    '@constants': ['dist/constants'],
  },
});
