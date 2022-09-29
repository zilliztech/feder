import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    entryPoints: ['dev/index.js'],
    bundle: true,
    outfile: 'dev/bundle.js',
  },
  {
    // serve options (optional)
    port: 12355,
    root: 'dev',
  }
);
