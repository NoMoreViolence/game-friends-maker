import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  dir: 'src',
  output: [
    {
      dir: 'build/',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  externals: [],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
  ],
};
