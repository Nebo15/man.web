require('dotenv').config({ silent: true });
require('babel-register')({
  presets: [
    'es2015',
    'react',
    'stage-0',
  ],
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    [
      'module-resolver',
      {
        root: ['../../app/common'],
        alias: {
          tests: '../../tests',
          withStyles: 'nebo15-isomorphic-style-loader/lib/withStyles',
          public: '../../public',
        },
      },
    ],
  ],
});

require('ignore-styles').default(['.scss', '.css', '.po', '.png', '.jpg', '.svg']);

global.__DEV__ = false; // eslint-disable-line
global.__CLIENT__ = false; // eslint-disable-line

require('./server');
