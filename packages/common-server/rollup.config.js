import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  dir: 'src',
  output: [
    {
      dir: 'build/',
      // file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  externals: ['mongoose', 'rxjs', 'mongodb', 'mongoose-unique-validator'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
  ],
};
