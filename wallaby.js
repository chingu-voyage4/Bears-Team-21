module.exports = function (wallaby) {
  process.env.NODE_ENV = 'test';

  return {
    files: [
      { pattern: '.env', instrument: false },
      { pattern: 'src/api/*.js', instrument: false },
      'src/api/**/*.js',
      { pattern: 'src/config/*.js', instrument: false },
      'src/*.js',
      { pattern: 'src/models/*.js', instrument: false },
      { pattern: 'src/models/**/*.js', instrument: false },
      { pattern: '*.js', instrument: false },
      { pattern: 'src/tests/*.js', ignore: true },
      { pattern: 'src/tests/**/*.js', ignore: true }
    ],

    tests: [
      'src/tests/*.js',
      'src/tests/**/*.js'
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'ESM_OPTIONS={esm:"js",cjs: {"namedExports":true, "interop": true, "vars": true, "paths": true, "cache":true, "extensions": true}}', runner: `-r ${require.resolve("@std/esm")}`
      }
    },

    testFramework: 'mocha',
    
    setup: function (w) {
      var server = require('./src/index');
      var chai = require('chai');
      var chaiHttp = require('chai-http');
      var db = require('./src/config/db');
      var mocha = w.testFramework;
      var expect = chai.expect();
      var should = chai.should()

      mocha.timeout(5000);

    },
    workers: {
      recycle: true
    }
  };
};