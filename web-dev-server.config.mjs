// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupNodeResolve from '@rollup/plugin-node-resolve';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonjs = fromRollup(rollupCommonjs);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nodeResolve = fromRollup(rollupNodeResolve);

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/',
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
    commonjs({
      include: ['node_modules/amazon-chime-sdk-js/**'],
      transformMixedEsModules: true,
      // esmExternals: true,
      // dynamicRequireTargets: ['node_modules/amazon-chime-sdk-js/**'],
    })
  ],

  // See documentation for all available options
});
